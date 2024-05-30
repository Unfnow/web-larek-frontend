import { Api, ApiListResponse } from './base/Api';
import {IOrder,IProduct, LotUpdate, IOrderResult} from "../types";

export interface IAuctionAPI {
    getLotList: () => Promise<IProduct[]>;
    getIProduct: (id: string) => Promise<IProduct>;
    getLotUpdate: (id: string) => Promise<LotUpdate>;
    //placeBid(id: string, bid: IBid): Promise<LotUpdate>;
    orderLots: (order: IOrder) => Promise<IOrderResult>;
}

export class AuctionAPI extends Api implements IAuctionAPI {
    readonly cdn: string;

    constructor(cdn: string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);
        this.cdn = cdn;
    }

    getIProduct(id: string): Promise<IProduct> {
        return this.get(`/product/${id}`).then(
            (item: IProduct) => ({
                ...item,
                image: this.cdn + item.image,
            })
        );
    }

    getLotUpdate(id: string): Promise<LotUpdate> {
        return this.get(`/product/${id}`).then(
            (data: LotUpdate) => data
        );
    }

    getLotList(): Promise<IProduct[]> {
        return this.get('/product').then((data: ApiListResponse<IProduct>) =>
            data.items.map((item) => ({
                ...item,
                image: this.cdn + item.image
            }))
        );
    }
    
    /*placeBid(id: string, bid: IBid): Promise<LotUpdate> {
        return this.post(`/product/${id}/_bid`, bid).then(
            (data: ILot) => data
        );
    }*/

    orderLots(order: IOrder): Promise<IOrderResult> {
        return this.post('/order', order).then(
            (data: IOrderResult) => data
        );
    }

}