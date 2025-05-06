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

document.querySelectorAll('.form__counter').forEach(control => {
	const buttons = control.querySelectorAll('button');
	const input = control.querySelector('input');

	control.addEventListener('click', e => {
		e.preventDefault();

		if(e.target === buttons[1]) {
			++input.value;
		} else if (e.target === buttons[0]) {
			(input.value > 0) && --input.value;
		}
	});
});
