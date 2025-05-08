import { throttle } from "../../js/libs/utils";

(() => {
	const arrDown = document.querySelector('a.main__down');
	const feedBack = document.querySelector('.worksheet');

	if (arrDown && feedBack) {
		window.addEventListener('scroll', throttle(() => {
			const inViewport = feedBack.getBoundingClientRect().top - window.innerHeight < -400;
			arrDown.classList.toggle('hidden', inViewport);
		}, 200), { passive: true });
	}

})();