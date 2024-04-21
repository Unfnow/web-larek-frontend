export type typeOfOrder= 'online'|'upon_receipt';
    

export interface Product {
    id: string
    description: string;
    image: string;
    title: string;
    category: string;
    price: number;
}

export interface Cart {
    orders: []; // orders extends Product: [];
    cartPrice: number;
    payType: typeOfOrder
    userAdress: string;
    userPhone: string;
    userMail: string;
}

export class ProductModel implements Product {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number;

}

export abstract class CartModel implements Cart{
    orders: [];
    cartPrice: number;
    payType: typeOfOrder;
    userAdress: string;
    userPhone: string;
    userMail: string;
    

    priceCount(obj:object){

    }
}