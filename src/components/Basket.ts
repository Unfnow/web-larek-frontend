import { Component } from './base/Component';
import {Model} from './base/Model';
import { IProduct, ICart, typeOfOrder } from './../types';
//import {IProduct} from "../../components/AppData";
import { createElement, ensureElement, formatNumber } from './../utils/utils';
import { EventEmitter } from './base/Events';

interface IBasketView {
	items: HTMLElement[];
	total: number;
	selected: string[];
}

export class CartModel extends Model<ICart> {
	//убрать абстрактность в документации
	orders: IProduct[];
	cartPrice: number;

	constructor(container: Partial<ICart>, protected events: EventEmitter) {
		super(container,events);
		this.events = events;
		this.orders = [];
		this.cartPrice = 0;
	}

	addToCart(item: IProduct) {
		if (item.price == null) {
			console.log('Действие невозможно');
		} else {
			if (!this.orders.includes(item)) {
				this.orders.push(item);
				this.events.emit('basket:changed');
			} else {
				console.log('Товар уже добавлен');
			}
		}
	}

	removeFromCard(item: IProduct) {
		console.log(item);
		this.orders = this.orders.filter((elem) => elem.id !== item.id);
	}

	priceCount() {
		this.cartPrice = this.orders.reduce(
			(accumulator, { price }) => accumulator + price,
			0
		);
	}
}

export class Basket extends Component<IBasketView> {
	protected _list: HTMLElement;
	protected _total: HTMLElement;
	protected _button: HTMLElement;

	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container);

		this._list = ensureElement<HTMLElement>('.basket__list', this.container);
		this._total = this.container.querySelector('.basket__price');
		this._button = this.container.querySelector('.basket__button');

		if (this._button) {
			this._button.addEventListener('click', () => {
				events.emit('order:open');
			});
		}

		this.items = [];
	}

	set items(items: HTMLElement[]) {
		if (items.length) {
			this._list.replaceChildren(...items);
			this.setDisabled(this._button,false);
		} else {
			this._list.replaceChildren(
				createElement<HTMLParagraphElement>('p', {
					textContent: 'Корзина пуста',
				})
			);
			this.setDisabled(this._button,true);
		}
	}

	set total(total: number) {
		this.setText(this._total, formatNumber(total) + ' синапсов');
	}
}
