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

// БЛОКИРОВКА СКРОЛЛА

// 1-й способ - при открытии модального окна происходит сдвиг фона
// на ширину убираемого правого скроллбара

const disableScroll = () => {
	// document.body.style.overflow = 'hidden'; // 1-й способ

	// window.innerWidth - ширина окна со скроллбаром
	// document.body.offsetWidth - ширина окна без скроллбара
	const widthScroll = window.innerWidth - document.body.offsetWidth; // ширина скроллбара

	// Добавим (создадим и сохраним) новое свойство dbScrollY для body
	// Оно "запомнит" значение проведенного скролла по оси Y
	document.body.dbScrollY = window.scrollY;

	// форма ${}, используемая ниже, называется интерполяция
	// position: fixed; // применённое ниже,
	// width: 100%;	// используется для
	// height: 100vh;	// совместимости с iPhone

	document.body.style.cssText = `
	position: fixed; 
	top: ${-window.scrollY}px;
	left: 0;
	width: 100%;
	height: 100vh;
	overflow: hidden;
	padding-right: ${widthScroll}px;
	`;
};

const enableScroll = () => {
	// document.body.style.overflow = ''; // 1-й способ
	document.body.style.cssText = '';

	// исключает скролл в начало страницы при закрытии модального окна
	window.scroll({
		top: document.body.dbScrollY,
	});
};

// МОДАЛЬНОЕ ОКНО

const subheaderCart = document.querySelector('.subheader__cart');
const cartOverlay = document.querySelector('.cart-overlay');

const cartModalOpen = () => {
	cartOverlay.classList.add('cart-overlay-open');
	disableScroll(); // 1-й и 2-й способы
};

const cartModalClose = () => {
	cartOverlay.classList.remove('cart-overlay-open');
	enableScroll(); // 1-й и 2-й способы
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
