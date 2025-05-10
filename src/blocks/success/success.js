(() => {

	const success = document.querySelector('.success');
	if (! success) return;

	const lang = new URLSearchParams(window.location.search).get('lang');
	const msgClass = 'success__text';

	document.querySelectorAll(`.${msgClass}`).forEach(msg => {
		msg.classList.contains(`${msgClass}_${lang}`) && (msg.style.display = 'block');
	});

})();