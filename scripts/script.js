const headerCityButton = document.querySelector('.header__city-button');

// Первый вариант с использованием if:
// if (localStorage.getItem('lomoda-location')) {
// 	headerCityButton.textContent = localStorage.getItem('lomoda-location');
// }

// Второй вариант с использованием тернарного оператора:
headerCityButton.textContent =
	localStorage.getItem('lomoda-location') || 'Ваш город?';

headerCityButton.addEventListener('click', () => {
	const city = prompt('Укажите Ваш город!');
	headerCityButton.textContent = city;
	localStorage.setItem('lomoda-location', city);
});
