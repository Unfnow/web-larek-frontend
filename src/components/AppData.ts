import _ from 'lodash';

import { Model } from './base/Model';
import {
	FormOrderErrors,
	FormContactsErrors,
	IAppState,
	IOrder,
	IContacts,
	IAddressNTypeForm,
	IProduct,
	IContactsForm,
} from '../types';
import { CartModel } from './common/Basket';

export type CatalogChangeEvent = {
	catalog: ProductModel[];
};

export class ProductModel extends Model<IProduct> {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number;
    total: number;
}

export class AppState extends Model<IAppState> {
	catalog: ProductModel[];
	order: IOrder & IContacts = {
		payment: '',
		address: '',
		email: '',
		phone: '',
		items: [],
        total: 0,
	};
	preview: string | null;
	FormOrderErrors: FormOrderErrors = {};
	FormContactsErrors: FormContactsErrors = {};

    addToItems(id:string) {
        this.order.items.push(id);
    }

	getTotal(cartToltal: number) {
        this.order.total= cartToltal
	}

	setCatalog(items: ProductModel[]) {
		this.catalog = items.map((item) => new ProductModel(item, this.events));
		this.emitChanges('items:changed', { catalog: this.catalog });
	}

	setPreview(item: ProductModel) {
		this.preview = item.id;
		this.emitChanges('preview:changed', item);
	}

	setOrderField(
		field: keyof IAddressNTypeForm | keyof IContactsForm,
		value: string
	) {
		this.order[field] = value;
		console.log(this.order);
		if (this.validateOrder() && this.validateContacts()) {
			this.events.emit('order:ready', this.order);
		}
	}

	validateOrder() {
		const errorsord: typeof this.FormOrderErrors = {};
		if (!this.order.payment) {
			errorsord.payment = 'Необходимо указать тип оплаты';
		}
		if (!this.order.address) {
			errorsord.address = 'Необходимо указать адрес';
		}

		this.FormContactsErrors = errorsord;
		this.events.emit('FormOrderErrors:change', this.FormOrderErrors);
		return Object.keys(errorsord).length === 0;
	}

	validateContacts() {
		const errorscon: typeof this.FormContactsErrors = {};
		if (!this.order.email) {
			errorscon.email = 'Необходимо указать email';
		}
		if (!this.order.phone) {
			errorscon.phone = 'Необходимо указать телефон';
		}
		this.FormOrderErrors = errorscon;
		this.events.emit('FormContactsErrors:change', this.FormContactsErrors);
		return Object.keys(errorscon).length === 0;
	}
}
