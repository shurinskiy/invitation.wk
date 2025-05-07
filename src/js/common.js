import { textareaResize, throttle } from "./libs/utils";
import "./polyfills.js";
import "./blocks.js";

/* Тут можно писать код общий для всего проекта и требующий единого пространства имен */

function updateVH() {
	const vh = (window.visualViewport?.height || window.innerHeight) * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', throttle(updateVH, 200), { passive: true });
updateVH();

// авторесайз формы, по мере заполнения
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