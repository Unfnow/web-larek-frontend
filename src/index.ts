import './scss/styles.scss';

import { AuctionAPI } from './components/AuctionAPI';
import { API_URL, CDN_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';
import {
	AppState,
	CatalogChangeEvent,
	ProductModel,
} from './components/AppData';
import { Page } from './components/Page';
import { AuctionItem, CatalogItem, BasketItem } from './components/Card';
import { cloneTemplate, createElement, ensureElement } from './utils/utils';
import { Modal } from './components/common/Modal';
import { Basket, CartModel } from './components/common/Basket';
import { IProduct, IAddressNTypeForm, IContactsForm } from './types';
import { Order } from './components/Order';
import { Contacts } from './components/Contacts';
import { Success } from './components/common/Success';

const events = new EventEmitter();
const api = new AuctionAPI(CDN_URL, API_URL);

// Чтобы мониторить все события, для отладки
events.onAll(({ eventName, data }) => {
	console.log(eventName, data);
});

// Все шаблоны
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
//const auctionTemplate = ensureElement<HTMLTemplateElement>('#card');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');
const bucketButton = ensureElement<HTMLTemplateElement>('.header__basket');

// Модель данных приложения
const appData = new AppState({}, events);

// Глобальные контейнеры
const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

// Переиспользуемые части интерфейса
//const bids = new Basket(cloneTemplate(bidsTemplate), events);

const basket = new Basket(cloneTemplate(basketTemplate), events);
const cart = new CartModel(cloneTemplate(cardBasketTemplate), events);
bucketButton.addEventListener('click', () => {
	events.emit('basket:open');
});
const order = new Order(cloneTemplate(orderTemplate), events);
const contacts = new Contacts(cloneTemplate(contactsTemplate), events);

// Дальше идет бизнес-логика
// Поймали событие, сделали что нужно

// Изменились элементы каталога
events.on<CatalogChangeEvent>('items:changed', () => {
	page.catalog = appData.catalog.map((item) => {
		const card = new CatalogItem(cloneTemplate(cardCatalogTemplate), {
			onClick: () => events.emit('card:select', item)
		});
		return card.render({
			title: item.title,
			image: item.image,
			description: item.description,
			price: item.price,
			category: item.category,
		});
	});

	//page.counter = appData.getClosedLots().length;
});

// Отправлена форма заказа
events.on('contacts:submit', () => {
	api
		.orderLots(appData.order)
		.then(() => {
			const success = new Success(cloneTemplate(successTemplate), cart.cartPrice, {
				onClick: () => {
					modal.close();
					events.emit('backet:clear')
				},
			});
			modal.render({
				content: success.render({}),
			});
		})
		.catch((err) => {
			console.error(err);
		});
});

events.on('order:submit', () => {
	events.emit('contacts:open');
});

events.on('contacts:open', () => {
	modal.render({
		content: contacts.render({
			valid: false,
			errors: [],
		}),
	});
	console.log(contacts.valid);
});

// Изменилось состояние валидации форм
events.on('FormContactsErrors:change', (errors: Partial<IContactsForm>) => {
	const { email, phone } = errors;
	contacts.valid = !email && !phone;
	contacts.errors = Object.values({ phone, email })
		.filter((i) => !!i)
		.join('; ');
});

events.on('FormOrderErrors:change', (errors: Partial<IAddressNTypeForm>) => {
	const { payment, address } = errors;
	order.valid = !payment && !address;
	order.errors = Object.values({ payment, address })
		.filter((i) => !!i)
		.join('; ');
});

// Изменилось одно из полей
events.on(
	/^contacts\..*:change/,
	(data: { field: keyof IContactsForm; value: string }) => {
		appData.setOrderField(data.field, data.value);
	}
);

events.on(
	/^order\..*:change/,
	(data: { field: keyof IAddressNTypeForm; value: string }) => {
		appData.setOrderField(data.field, data.value);
	}
);

// Открыть форму заказа
events.on('order:open', () => {
    cart.orders.forEach(item=>appData.addToItems(item.id));
    appData.getTotal(cart.cartPrice)
	modal.render({
		content: order.render({
			valid: false,
			errors: [],
		}),
	});
});

events.on(
	'payMethod:change',
	(data: { payment: keyof IContactsForm; value: string }) => {
		appData.setOrderField(data.payment, data.value);
	}
);

events.on('payMethod:card', (order: Order) => {
	if (order.payType == 'cash') {
		order.cash.classList.remove('button_alt-active');
	}
	order.card.classList.add('button_alt-active');
	order.payType = 'card';
	console.log('payMethod:card');
	events.emit('payMethod:change', { payment: 'payment', value: order.payType });
	order.render({
		valid: false,
		errors: [],
	});
});

events.on('payMethod:cash', (order: Order) => {
	if (order.payType == 'card') {
		order.card.classList.remove('button_alt-active');
	}
	order.cash.classList.add('button_alt-active');
	order.payType = 'cash';
	console.log('payMethod:cash');
	events.emit('payMethod:change', { payment: 'payment', value: order.payType });
	order.render({
		valid: false,
		errors: [],
	});
});

// Открыть корзину
events.on('basket:open', () => {
	modal.render({
		content: createElement<HTMLElement>('div', {}, [basket.render()]),
	});
});

events.on('basket:changed', () => {
	page.counter = cart.orders.length;
	basket.items = cart.orders.map((item, index) => {
		const model = new BasketItem(
			cloneTemplate(cardBasketTemplate),
			events,
			item
		);
		return model.render({
			orderNumber: index + 1,
			title: item.title,
			price: item.price,
		});
	});
	cart.priceCount();
	basket.total = cart.cartPrice;
});

events.on('basket:removed', (item) => {
	console.log(item);
	cart.removeFromCard(item as IProduct);
	events.emit('basket:changed');
});

events.on('backet:clear', ()=>{
    cart.orders.forEach(item=>cart.removeFromCard(item));
    events.emit('basket:changed');
})

// Открыть лот
events.on('card:select', (item: ProductModel) => {
	appData.setPreview(item);
});

// Изменен открытый выбранный лот

events.on('preview:changed', (item: ProductModel) => {
	const showItem = (item: ProductModel) => {
		const card = new AuctionItem(cloneTemplate(cardPreviewTemplate));
		console.log('preview:changed');
		modal.render({
			content: card.render({
				title: item.title,
				image: item.image,
				description: item.description,
				price: item.price,
				category: item.category,
			}),
		});
		document.querySelector('.card__button')?.addEventListener('click', () => {
			cart.addToCart(item);
		});
	};
	if (item) {
		api
			.getIProduct(item.id)
			.then((result) => {
				item.description = result.description;
				//item.history = result.history;
				showItem(item);
			})
			.catch((err) => {
				console.error(err);
			});
	} else {
		modal.close();
	}
});

// Блокируем прокрутку страницы если открыта модалка
events.on('modal:open', () => {
	page.locked = true;
});

// ... и разблокируем
events.on('modal:close', () => {
	page.locked = false;
});

// Получаем лоты с сервера
api
	.getLotList()
	.then(appData.setCatalog.bind(appData))
	.catch((err) => {
		console.error(err);
	});
