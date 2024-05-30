import { Form } from './common/Form';
import { IAddressNTypeForm, typeOfOrder } from '../types';
import { IEvents } from './base/Events';

export class OrderForm extends Form<IAddressNTypeForm> {
	public card: HTMLElement;
	public cash: HTMLElement;
	public payType: typeOfOrder;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);
		this.card = this.container.querySelector('[name=card]');
		this.cash = this.container.querySelector('[name=cash]');

		this.card.addEventListener('click', () =>
			this.toggleCard(),	
		);

		this.cash.addEventListener('click', () =>
			this.toggleCash(),
		);
	}

	set payment(value: string) {
		(this.container.elements.namedItem('payment') as HTMLInputElement).value =
			value;
	}

	set address(value: string) {
		(this.container.elements.namedItem('address') as HTMLInputElement).value =
			value;
	}

	toggleCard(state = true) {
        this.toggleClass(this.card, 'button_alt-active', state);
		this.toggleClass(this.cash, 'button_alt-active', !state);
		this.events.emit('payMethod:change', { payment: 'payment', value: 'card' })
    }

    toggleCash(state = true) {
        this.toggleClass(this.cash, 'button_alt-active', state);
		this.toggleClass(this.card, 'button_alt-active', !state);
		this.events.emit('payMethod:change', { payment: 'payment', value: 'cash' })
    } 
}
