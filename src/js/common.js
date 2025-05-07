import { textareaResize } from "./libs/utils";
import "./polyfills.js";
import "./blocks.js";

/* Тут можно писать код общий для всего проекта и требующий единого пространства имен */

new ResizeObserver(() => {
	const root = document.documentElement;
	const vh = root.clientHeight / 100;
	// const vw = root.clientWidth / 100;

	root.style.setProperty('--vh', `${vh}px`);
	// root.style.setProperty('--vw', `${vw}px`);
}).observe(document.documentElement);

textareaResize(document.querySelector('.form__textarea'));

const counter = document.querySelector('.form__counter input');
const checks = document.querySelectorAll('input.form__check');
	
counter.parentNode.addEventListener('click', e => {
	e.preventDefault();
	
	if (counter.disabled) return;
	const buttons = e.currentTarget.querySelectorAll('button');

	if(e.target === buttons[1]) {
		++counter.value;
	} else if (e.target === buttons[0]) {
		(counter.value > 1) && --counter.value;
	}
});

checks.forEach(input => input.addEventListener('change', e => {
	const isReject = e.currentTarget == checks[1];
	
	counter.disabled = isReject;
	counter.value = + !isReject;

}));
