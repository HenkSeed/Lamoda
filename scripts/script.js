const headerCityButton = document.querySelector('.header__city-button');

const goodsTitle = document.querySelector('.goods__title'); // Для смены заголовка "Мужчинам"<->"Женщинам"<->"Детям"

let hash = location.hash.substring(1); // Определяем и сохрняем в переменную хеш страницы, убрав знак # функцией substring

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
	// height: 100vh;	// кроссбраузерной совместимости

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

// ЗАПРОС БАЗЫ ДАННЫХ

const getData = async () => {
	const data = await fetch('db.json'); // функция асинхронная, поэтому данных в константе data
	// не будет, а будет promise (обещание, что данные будут, но надо подождать)
	// параметр await означает ожидание получения данных
	if (data.ok) {
		return data.json();
	} else {
		// Формируем сообщение об ошибке
		throw new Error(
			`Данные не были получены. Ошибка ${data.status} ${data.statusText}`
		);
	}
};

// Первый Вариант обработки ошибки:
// Когда функция выполнится, тогда ... выполнятся две стрелочные функции
// getData().then(
// 	(data) => {
// 		console.log(data);
// 	},
// 	(err) => {
// 		console.error(err);
// 	}
// );

// Второй Вариант обработки ошибки (его применим в callback-функции getGoods):
// getData()
// 	.then((data) => {
// 		console.log(data);
// 	})
// 	.catch((err) => {
// 		console.error(err);
// 	});

// callback-функция - это отложенная функция (срабатывает после событий типа 'click',
// после получения данных с сервера, после получения ошибки и т.д.)

const getGoods = (callback, value) => {
	getData()
		.then((data) => {
			console.log('value: ', value);
			if (value) {
				callback(data.filter((item) => item.category === value)); // Фильтр категорий товара
				if (value === 'men') {
					goodsTitle.textContent = 'Мужчинам';
				}
				if (value === 'women') {
					goodsTitle.textContent = 'Женщинам';
				}
				if (value === 'kids') {
					goodsTitle.textContent = 'Детям';
				}
			} else {
				callback(data);
			}
		})
		.catch((err) => {
			console.error(err);
		});
};

// ОБРАБОТКА СОБЫТИЙ МОДАЛЬНОГО ОКНА КОРЗИНЫ
// ===========================================================================
subheaderCart.addEventListener('click', cartModalOpen);

cartOverlay.addEventListener('click', (event) => {
	const target = event.target;
	// console.log('target: ', target);
	// if (target.classList.contains('cart__btn-close')) { - Первый вариант
	if (target.matches('.cart__btn-close') || target.matches('.cart-overlay')) {
		// Второй вариант, плюс добавлено закрытие по клику мимо окна
		cartModalClose();
	}
}); // элемент event создается во время любого события

// Закрытие модального окна по нажатию клавиши Esc
document.addEventListener('keydown', (data) => {
	if (data.key === 'Escape') {
		cartModalClose();
	}
});
// ============================================================================

// ВЫВОД КАРТОЧЕК ТОВАРОВ
// ============================================================================

try {
	console.log(hash);
	// Проверяем, действительно ли мы находимся на странице с товарами конструкцией try{}catch{}
	const goodsList = document.querySelector('.goods__list');
	if (!goodsList) {
		throw 'This is not a goods page';
	}
	// Создаёт карточку товара в точке вызова

	// const createCard = (data) => {   // Это при использовании двух первых вариантов присвоения
	const createCard = ({ id, name, cost, brand, preview, sizes }) => {
		// Можно присвоить переменным значение объекта так:
		// const id = data.id;
		// const name = data.name;
		// const cost = data.cost;
		// const brand = data.brand;
		// const preview = data.preview;
		// const sizes = data.sizes;

		// А можно так:
		// const { id, name, cost, brand, preview, sizes } = data;

		// А можно сразу создать эти свойства объекта при создании функции createCard (смотреть выше)

		const li = document.createElement('li');
		li.classList.add('goods__item');

		// Используем шаблонную строку для включения HTML кода (заполняем карточку товара)
		// sizes.join(' ') - выводит элементы массива sizes[] с разделителем "пробел",
		// тернарный оператор ${sizes ? `` : ''} выводит размеры, если они есть в базе по данному товару, и 'нет', если их нет
		li.innerHTML = `
		<article class="good">
			<a class="good__link-img" href="card-good.html#${id}">
				<img
					class="good__img"
					src="goods-image/${preview}"
					alt=""
				/>
			</a>
			<div class="good__description">
				<p class="good__price">${cost} &#8381;</p>
				<h3 class="good__title">
					${brand} <span class="good__title__grey">/ ${name}</span>
				</h3>
				<p class="good__sizes">
					Размеры (RUS):
					${sizes ? `<span class="good__sizes-list">${sizes.join(' ')}</span>` : 'нет'}
					
				</p>
				<a class="good__link" href="card-good.html#${id}"
					>Подробнее</a
				>
			</div>
		</article>
		`;
		return li;
	};

	// Рендерим карточки товаров, получая их с сервера
	// Создаём renderGoodsList, которую будем использовать в качестве callback-функции
	const renderGoodsList = (data) => {
		// console.log('data: ', data);
		goodsList.textContent = ''; // очищаем карточки товаров

		// Первый вариант организации цикла перебора карточек
		// for (let i = 0; i < data.length; i++) {
		// 	console.log('for: ', data[i]);
		// }

		// Второй вариант организации цикла перебора карточек
		// for (const item of data) {
		// 	console.log('forof: ', item);
		// }

		// Третий вариант организации перебора карточек (не цикл, а функция перебора)
		// У функции три параметра: (element, index, array). Имена параметров назначаются произвольно

		data.forEach((element, index, array) => {
			// console.log('forEach: ', index);
			// console.log('forEach: ', element);
			// console.log('forEach: ', array);   // С каждой итерацией выводится один и тот же массив
			//                                    // (копии не создаются, а используются разные указатели на
			//                                    // него)
			const card = createCard(element); // Заполняем карточку данными очередного element из базы
			goodsList.append(card); // Выводим карточку на страницу
		});
	};

	window.addEventListener('hashchange', () => {
		hash = location.hash.substring(1);
		getGoods(renderGoodsList, hash);

		// Для смены заголовка "Мужчинам"<->"Женщинам"<->"Детям"
		// НЕ РАБОТАЕТ, ЕСЛИ НЕ ИЗМЕНИЛСЯ ХЕШ !!!, то есть до первого выбора категории товара
		// if (hash === 'men') {
		// 	goodsTitle.textContent = 'Мужчинам';
		// }
		// if (hash === 'women') {
		// 	goodsTitle.textContent = 'Женщинам';
		// }
		// if (hash === 'kids') {
		// 	goodsTitle.textContent = 'Детям';
		// }
	});

	getGoods(renderGoodsList, hash);

	// Отрабатывает, если мы не находимся на странице с товарами
} catch (err) {
	console.warn(err);
}
