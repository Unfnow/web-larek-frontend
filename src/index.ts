import './scss/styles.scss';

import { AuctionAPI } from './components/AuctionAPI';
import { API_URL, CDN_URL } from './utils/constants';
import { EventEmitter } from './components/base/Events';
import {
	AppState,
	CatalogChangeEvent,
	ProductModel,
} from './components/AppData';
import { Page } from './components/Page';
import { AuctionItem, CatalogItem, BasketItem } from './components/Card';
import { cloneTemplate, createElement, ensureElement } from './utils/utils';
import { Modal } from './components/common/Modal';
import { Basket, CartModel } from './components/Basket';
import { IProduct, IAddressNTypeForm, IContactsForm } from './types';
import { OrderForm } from './components/Order';
import { ContactsForm } from './components/Contacts';
import { Success } from './components/Success';

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

// Модель данных приложения
const appData = new AppState({}, events);

// Глобальные контейнеры
const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

// Переиспользуемые части интерфейса

const basket = new Basket(cloneTemplate(basketTemplate), events);
const cart = new CartModel({}, events);
const order = new OrderForm(cloneTemplate(orderTemplate), events);
const contacts = new ContactsForm(cloneTemplate(contactsTemplate), events);

// Дальше идет бизнес-логика
// Поймали событие, сделали что нужно

// Изменились элементы каталога
events.on<CatalogChangeEvent>('items:changed', () => {
	page.catalog = appData.catalog.map((item) => {
		const card = new CatalogItem(cloneTemplate(cardCatalogTemplate), {
			onClick: () => events.emit('card:select', item),
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
			const totalPrice=cart.cartPrice
			events.emit('backet:clear');
			appData.setItemsClear();
			const success = new Success(
				cloneTemplate(successTemplate),
				totalPrice,
				{
					onClick: () => {
						modal.close();
					},
				}
			);
			modal.render({
				content: success.render({}),
			});
		})
		.catch((err) => {
			console.error(err);
		});
});

// Изменилось состояние валидации форм
events.on('FormContactsErrors:change', (errors: Partial<IContactsForm>) => {
	const { email, phone } = errors;
	console.log(errors, ' errors')
	console.log(!email, ' email')
	console.log(!phone, ' phone')
	contacts.valid = !email && !phone;
	contacts.errors = Object.values({ phone, email })
		.filter((i) => !!i)
		.join('; ');
});

events.on('FormOrderErrors:change', (errors: Partial<IAddressNTypeForm>) => {
	const { payment, address } = errors;
	console.log(errors, ' errors')
	console.log(!payment, ' payment')
	console.log(!address, ' address')
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
	cart.orders.forEach((item) => appData.addToItems(item.id));
	appData.getTotal(cart.cartPrice);
	modal.render({
		content: order.render({
			valid: false,
			errors: [],
		}),
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
});

events.on('payMethod:change',(data: { payment: keyof IContactsForm; value: string }) => {
		appData.setOrderField(data.payment, data.value);
		console.log('payMethod:change')
	}
);

//Добавить элемент в корзину
events.on('basket:add', (item: IProduct)=>{
		cart.addToCart(item);
})

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

// Убрать элемент из корзины 
events.on('basket:removed', (item) => {
	console.log(item);
	cart.removeFromCard(item as IProduct);
	events.emit('basket:changed');
});

// Очистить всю корзину
events.on('backet:clear', () => {
	cart.orders.forEach((item) => cart.removeFromCard(item));
	events.emit('basket:changed');
});

// Открыть лот
events.on('card:select', (item: ProductModel) => {
	appData.setPreview(item);
});

// Изменен открытый выбранный лот

events.on('preview:changed', (item: ProductModel) => {
	const showItem = (item: ProductModel) => {
		
		const card = new AuctionItem(cloneTemplate(cardPreviewTemplate),{
			onClick: () => {events.emit('basket:add',item)
				card.setDisabled(card._button,true)
				card.setText(card._button, 'Уже в корзине');
			}
		});
		if(cart.orders.includes(item)){
			card.setDisabled(card._button,true)
			card.setText(card._button, 'Уже в корзине');
		}
		else {
			card.setDisabled(card._button,false)}
			modal.render({
				content: card.render({
					title: item.title,
					image: item.image,
					description: item.description,
					price: item.price,
					category: item.category,
				}),
			});
	};
	if (item) {
		api
			.getIProduct(item.id)
			.then((result) => {
				item.description = result.description;
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
