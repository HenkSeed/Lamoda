# Lomoda

## Интенсив по Javascript от Максима Лескина

## Выполнил Семёнов Игорь

Использовались технологии:

- html
- css
- Javascript

В коде JS применены следующие функции и методы:

## Day 01

- document.querySelector();
- document.addEventListener() на события:
  - click;
- использование локального хранилища браузера для хранения данных, введённых пользователем:
  - .setItem;
  - .getItem;
- применение тернарного оператора;
- .textContent;
- работа с модальным окном:
  - event.target;
  - target.classList.add('');
  - target.classList.remove('');
  - target.classList.contains('');
  - target.matches('.')
- ${} - интерполяция;
- document.body.style.cssText = ``
- window.innerWidth;
- document.body.offsetWidth;
- window.scroll({});

* Содержимое localStorage браузера можно посмотреть и очистить в закладке Application инструмента разработчика (F12)

## Day 02

- асинхронные функции:
  - async;
  - await;
  - fetch;
- if (data.ok);
- throw new Error (``);
- варианты вывода в консоль:
  - console.log(data);
  - console.dir(data);
  - console.error(data);
  - console.warn(data);
- .then;
- .catch;
- event.target;
- target.matches;
- try {} catch (err) {}
- const createCard = ({ id, name, cost }) => {} // Объявление стрелочной функции с созданием/объявлением её аргументов (их имена должны соответствовать индексам в используемой базе данных)
- li.innerHTML = `` (создание HTML кода с помощью шаблонной строки)
- data.forEach((element, index, array) => {}) - перебор элементов массива и выполнение с ними действий в стрелочной функции
- location;
- location.hash;
- .substring ();
- window.addEventListener('hashchange', () => {}) - обработка события "смена хеша"
