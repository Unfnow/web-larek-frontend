import {ensureElement} from "../utils/utils";
export class Card{
    constructor(){
        const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card');
        const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#preview');
        const auctionTemplate = ensureElement<HTMLTemplateElement>('#auction');
        const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#bid');
        const bidsTemplate = ensureElement<HTMLTemplateElement>('#bids');
        const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
        const tabsTemplate = ensureElement<HTMLTemplateElement>('#tabs');
        const soldTemplate = ensureElement<HTMLTemplateElement>('#sold');
        const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
        const successTemplate = ensureElement<HTMLTemplateElement>('#success');
    }
    
}