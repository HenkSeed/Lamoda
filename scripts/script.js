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

// Модальное окно

const subheaderCart = document.querySelector('.subheader__cart');
const cartOverlay = document.querySelector('.cart-overlay');

const cartModalOpen = () => {
	cartOverlay.classList.add('cart-overlay-open');
};

const cartModalClose = () => {
	cartOverlay.classList.remove('cart-overlay-open');
};

subheaderCart.addEventListener('click', cartModalOpen);

cartOverlay.addEventListener('click', (event) => {
	const target = event.target;
	console.log('target: ', target);
	// if (target.classList.contains('cart__btn-close')) { - Первый вариант
	if (target.matches('.cart__btn-close') || target.matches('.cart-overlay')) {
		// Второй вариант, плюс добавлено закрытие по клику мимо окна
		cartModalClose();
	}
}); // элемент event создается во время любого события
