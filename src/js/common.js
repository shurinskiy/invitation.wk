import { textareaResize, validate } from "./libs/utils";
import "./polyfills.js";
import "./blocks.js";

/* Тут можно писать код общий для всего проекта и требующий единого пространства имен */
/* Идентификатор развертывания AKfycby7VvnsVFrfpMcTOEXmnH3jZ4v7hOaaHW-Y4-u2gADdEMquNBw9HVepPtxaMfy1YWR_Sw */

// авторесайз формы, по мере заполнения
textareaResize(document.querySelector('.form__textarea'));

const scriptURL = 'https://script.google.com/macros/s/AKfycby7VvnsVFrfpMcTOEXmnH3jZ4v7hOaaHW-Y4-u2gADdEMquNBw9HVepPtxaMfy1YWR_Sw/exec';

const form = document.querySelector('form.form');
const counter = form?.querySelector('.form__counter input');
const checks = form?.querySelectorAll('input.form__check');
const msg = form?.querySelector('textarea.form__textarea');
const verifiable = form?.querySelectorAll('[data-rules]');

const checkValidate = () => {
	const valid = [...checks].some(check => check.checked);
	checks.forEach(check => check.classList.toggle('error', !valid));
	return valid;
};

const inputValidate = () => {
	return [...verifiable].every(input => {
		const valid = validate(input);
		input.classList.toggle('error', !valid);
		return valid;
	});
};

counter?.parentNode.addEventListener('click', e => {
	e.preventDefault();
	if (counter.disabled) return;

	const [dec, inc] = e.currentTarget.querySelectorAll('button');
	if (e.target === inc) ++counter.value;
	else if (e.target === dec && counter.value > 1) --counter.value;
});

checks?.forEach(input =>
	input.addEventListener('change', e => {
		const isReject = e.currentTarget === checks[1];

		counter.disabled = isReject;
		counter.value = +!isReject;
		checkValidate();
	}));

msg?.addEventListener('input', e => e.currentTarget.classList.remove('error'));
msg?.addEventListener('change', inputValidate);

form?.addEventListener('submit', async e => {
	e.preventDefault();

	const checksValid = checkValidate();
	const inputsValid = inputValidate();

	if (checksValid && inputsValid) {
		const data = Object.fromEntries(new FormData(form));

		try {
			const response = await fetch(scriptURL, {
				method: 'POST',
				body: JSON.stringify(data),
				headers: { 'Content-Type': 'application/json' },
			});
			const result = await response.json();
			result.result === 'success' ? form.reset() : console.warn('Submission error');
		} catch (err) {
			console.error('Network error:', err);
		}
	}
});