//export type LotStatus = 'wait' | 'active' | 'closed';
export type typeOfOrder = 'card' | 'cash';
export interface IAuction {
	//status: LotStatus;
	datetime: string;
	price: number;
	minPrice: number;
	history?: number[];
}

export const ColorCategory: Array<string> = [
	'soft',
	'софт-скил',
	'hard',
	'хард-скил',
	'other',
	'другое',
	'additional',
	'дополнительное',
	'button',
	'кнопка',
];

export interface IProduct {
	id: string;
	description: string;

	title: string;
	image: string;
	category: string;
	price: number;
}

export interface ICart {
	orders: IProduct[]; //В документации IProduct
	cartPrice: number;
}

//export type ILot = IProduct & ICart;

export type LotUpdate = Pick<
	IProduct,
	'id' | 'description' | 'category' | 'price'
>;

export type IBasketItem = Pick<IProduct, 'id' | 'title' | 'price'> & {
	isMyBid: boolean;
};

export interface IAppState {
	catalog: IProduct[];
	basket: string[];
	preview: string | null;
	order: IOrder | IContacts | null;
	//loading: boolean;
}

export interface IAddressNTypeForm {
	payment: string;
	address: string;
}

export interface IContactsForm {
	email: string;
	phone: string;
}

export interface IOrder extends IAddressNTypeForm {
	items: string[];
}

export interface IContacts extends IContactsForm {
	items: string[];
	total: number;
}

export type FormOrderErrors = Partial<Record<keyof IOrder, string>>;

export type FormContactsErrors = Partial<Record<keyof IContacts, string>>;

export interface IOrderResult {
	id: string;
}
