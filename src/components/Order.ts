import {Form} from "./common/Form";
import {IAddressNTypeForm, typeOfOrder} from "../types";
import {IEvents} from "./base/events";

export class Order extends Form<IAddressNTypeForm> {
    public card: HTMLElement;
    public cash: HTMLElement;
    public payType: typeOfOrder;

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);
        this.card= this.container.querySelector('[name=card]');
        this.cash= this.container.querySelector('[name=cash]');

        this.card.addEventListener('click',()=>
        this.events.emit('payMethod:card', this))
        

        this.cash.addEventListener('click',()=>
        this.events.emit('payMethod:cash', this))

    }
}