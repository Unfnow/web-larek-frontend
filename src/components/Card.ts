import { EventEmitter } from './base/Events';
import { Component } from './base/Component';
import { IProduct, ColorCategory } from '../types';
import {ensureElement} from '../utils/utils';

interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

export class Card<T> extends Component<IProduct> {
	//protected events = new EventEmitter();
	protected _title: HTMLElement;
	protected _image?: HTMLImageElement;
	protected _description?: HTMLElement;
	public _button?: HTMLButtonElement;
	protected _category?: HTMLButtonElement;
	protected _price?: HTMLButtonElement;

	constructor(container: HTMLElement, actions?: ICardActions) {
		super(container);

		this._title = ensureElement<HTMLElement>(`.card__title`, container);
		this._image = ensureElement<HTMLImageElement>(`.card__image`, container);
		this._button = container.querySelector(`.card__button`);
		this._description = container.querySelector(`.card__text`);
		this._category = container.querySelector(`.card__category`);
		this._price = container.querySelector(`.card__price`);

		if (actions?.onClick) {
			if (this._button) {
				this._button.addEventListener('click', actions.onClick);
			} else {
				container.addEventListener('click', actions.onClick);
			}
		}
	}

	set id(value: string) {
		this.container.dataset.id = value;
	}

	get id(): string {
		return this.container.dataset.id || '';
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	get title(): string {
		return this._title.textContent || '';
	}

	set image(value: string) {
		this.setImage(this._image, value, this.title);
	}

	set description(value: string) {
		this.setText(this._description, value);
	}

	get description(): string {
		return this._description.textContent || '';
	}

	set category(value: string) {
		const ind = ColorCategory.indexOf(
			ColorCategory.find((elem) => elem == value)
		);
		const cat = ColorCategory[ind - 1];
		this.toggleClass(this._category,'card__category_' + cat)
		this.setText(this._category, value);
	}

	get category(): string {
		return this._category.textContent || '';
	}

	set price(value: string) {
		if (value == null) {
			this.setText(this._price, 'Бесценно');
			this.setText(this._button, 'Нельзя купить');
			this.setDisabled(this._button,true);
		} else {
			this.setText(this._price, value + ' синапсов');
		}
	}

	get price(): string {
		return this._price.textContent || '';
	}

}

export type CatalogItemStatus = {
	//
};

export class CatalogItem extends Card<CatalogItemStatus> {
	protected _status: HTMLElement;
}

export class AuctionItem extends Card<HTMLElement> {
	protected _status: HTMLElement;
	protected events = new EventEmitter();

	constructor(container: HTMLElement, actions?: ICardActions) {
		super(container, actions);
		if (actions?.onClick) {
            if (this._button) {
                this._button.addEventListener('click',actions.onClick); 
			}
		}
	}
}

export interface IBasketItem {
	orderNumber: number;
	title: string;
	price: number;
	button: HTMLButtonElement;
}

export class BasketItem extends Component<IBasketItem> {
	protected _orderNumber: HTMLElement;
	protected _title: HTMLElement;
	protected _price: HTMLElement;
	protected _button: HTMLButtonElement;

	constructor(
		container: HTMLElement,
		protected events: EventEmitter,
		item: IProduct
	) {
		super(container);
		this._orderNumber = ensureElement<HTMLElement>(
			`.basket__item-index`,
			this.container
		);
		this._title = ensureElement<HTMLElement>(`.card__title`, this.container);
		this._price = ensureElement<HTMLElement>(`.card__price`, this.container);
		this._button = ensureElement<HTMLButtonElement>(
			`.card__button`,
			this.container
		);
		if (this._button) {
			this._button.addEventListener('click', () => {
				console.log(item);
				events.emit('basket:removed', item);
			});
		}
	}

	set orderNumber(value: string) {
		this.setText(this._orderNumber, value);
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	set price(value: number) {
		this.setText(this._price, value + ' синапсов');
	}
}
