import {Api} from './base/api'
export class DataManager extends Api{
    constructor(baseUrl,options){
        super(baseUrl, options);
        baseUrl='';
        options='';
    }

    directions='';

    dataFetcher(uri: string){
        return this.get(uri);
    }

    dataParcer(elems:[object]){
        return this.post(this.baseUrl,elems)
    }


}