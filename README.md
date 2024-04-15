# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Базовый код

Архитектуру проекта формирует паттерн MVP (Model-View-Presenter), который подразумевает разделение проекта на состовные части:
Model- основная логика приложения
View- интерфейс приложения
Presenter- посредник между Model и View, который пепредаёт данные между ними.

Также ТЗ требует выполнение следующих требований:

Главная страница: 
-содержит каталог товаров;
-при нажатии на карточку товара открывается модальное окно с детальной информацией о товаре;
-при нажатии на иконку корзины, открывается корзина.
Просмотр товара: 
-показана детальная информация о товаре;
-при нажатии на кнопку «Купить» товар добавляется в корзину, если не был добавлен в корзину раньше;
-при нажатии на кнопку «Убрать» товар удаляется из корзины.
Оформление товара: 
Первый шаг: 
-выбор способа оплаты;
-ввод адреса доставки;
-если адрес доставки не введён, появляется сообщение об ошибке.
Второй шаг: 
-ввод почты и телефона покупателя;
-если одно из полей не заполнено, появляется сообщение об ошибке;
-при нажатии на кнопку оплаты появляется сообщение об успешной оплате и -товары удаляются из корзины.
Требования ко всем страницам:
Модальные окна закрываются: 
-по клику вне модального окна;
-по клику на иконку «Закрыть» (крестик).
-Кнопка перехода к следующему шагу становится доступна только после выполнения действий на текущей странице (выбора товара, способа оплаты, заполнения данных о покупателе).


## Слой Model

# Класс Model
Класс, отвечающий за "Backend" часть программы. Так как сложных логических операций данный проект не предусматривает, то этот класс реализует логику взаимодействия программы с сервером. Этот класс формирует запрос и передаёт его в класс API, через который производится запрос на сервер. Конструктор принимает void и возвращает void.
Методы:
-parseData(url:string): Вызывает функцию get() класса API, получая данные о товарах  с сервера. Принимает строку(string), которая описывает путь до списка товаров.
-sendOrder(order: orderType): Вызывает функцию post() класса API, отправляя данные о заказе на сервер. Принимает объект, хранящий в себя данные о заказе.
Поля:
-productList: array[obj]: Массив объектов, в который записывается список товаров с сервера

## Слой Presenter

# Класс Presenter
Класс представляет из себя слой между Представлением и Моделью, поэтому выполняет две функции: Передать данные в следующий слой, а также обрабатывает данные которые нет смысла отправлять в более низкий слой. Конструктор принимает void и возвращает void.
Методы:
-moveData<T>: Передаёт объект массивов в следующий слой. Получает Дженерик тип.
-cartCount(value:number|null): Хранит данныео статусе корзины и передаёт в слой View последнее сохранённое значение.
-formReader(obj): Принмает данные с форм, создаёт и передаёт в слой Model объект типа orderType, который позже отправится на сервер
Поля:
-cartCount: number: Поле типа number, хранящее значение кол-ва покупок

## Слой View
Программный код должен реализовывать большое кол-во косметического функционала. Поэтому этот слой самый крупный.

# Класс View
Это диспетчерский класс, который вызывает остальной функционал слоя. Конструктор принимает массив товаров, после чего, при помощи метода  выводит заполненные карточки на экран. возвращает void

Методы:
cardOutput(array[obj]): Метод принимает на вход массив продуктов и для каждого элемента вызывает отображение карточки

# Класс Button
Абстрактный класс, который наследует два вида кнопок: кнопка закрытия окна и кнопка подтверждения операции.