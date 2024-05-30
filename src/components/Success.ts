import {Component} from "./base/Component";
import {ensureElement} from "./../utils/utils";

interface ISuccess {
    total: number;
}

interface ISuccessActions {
    onClick: () => void;
}

export class Success extends Component<ISuccess> {
    protected _close: HTMLElement;
    protected total: HTMLElement;

    constructor(container: HTMLElement, cartPrice:number, actions: ISuccessActions) {
        super(container);
        
        this.total = ensureElement<HTMLElement>('.order-success__description',this.container)
        this._close = ensureElement<HTMLElement>('.order-success__close', this.container);

        console.log(this.container)

        if (actions?.onClick) {
            this._close.addEventListener('click', actions.onClick);
        }


        this.total.textContent='Списано ' +cartPrice+ ' синапсов';

    }


}