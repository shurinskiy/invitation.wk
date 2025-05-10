import { textareaResize, validate } from "./libs/utils";
import "./polyfills.js";
import "./blocks.js";

/* Тут можно писать код общий для всего проекта и требующий единого пространства имен */

// авторесайз формы, по мере заполнения
textareaResize(document.querySelector('.form__textarea'));

const scriptURL = 'https://script.google.com/macros/s/AKfycbw5SlKdS47RA01O3b3EX_YiLaCYJ61mrxGrYFLttz5dvFi-mMUdCJSju4MZz8g4PbwXbg/exec';

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
		try {
			const response = await fetch(scriptURL, {
				method: 'POST',
				body: new FormData(form),
			});
			const result = await response.json();
			
			if (result.result === 'success') {
				form.reset();
				window.location.href = `/thanks.html?lang=${document.documentElement.lang || 'ru'}`;
			} else {
				console.warn('Submission error');
			}
			
		} catch (err) {
			console.error('Network error:', err);
		}
	}
});


// Скрипт в Google Apps Script

/* const sheetName = 'guests'; // это не сама таблица, а лист в таблице!
const scriptProp = PropertiesService.getScriptProperties();

function intialSetup() {
	const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
	scriptProp.setProperty('key', activeSpreadsheet.getId());

	// Logger.log(activeSpreadsheet);
}

function doPost(e) {
	var lock = LockService.getScriptLock();
	lock.tryLock(10000);

	try {
		const doc = SpreadsheetApp.openById(scriptProp.getProperty('key'));
		const sheet = doc.getSheetByName(sheetName);

		const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
		const nextRow = sheet.getLastRow() + 1;

		const newRow = headers.map(function (header) {
			return header === 'timestamp' ? new Date() : e.parameter[header];
		});

		sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

		return ContentService
			.createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
			.setMimeType(ContentService.MimeType.JSON);
	}

	catch (e) {
		return ContentService
			.createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
			.setMimeType(ContentService.MimeType.JSON);
	}

	finally {
		lock.releaseLock();
	}
} */