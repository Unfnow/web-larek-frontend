import { API_URL } from '../utils/constants';
import {Api} from './base/api'
import {ProductModel} from'./base/Model'
export class DataManager extends Api{
    constructor(baseUrl: string, options: RequestInit = {}){
        super(baseUrl, options);
        //baseUrl=API_URL;
    }

    directions='';

    /*dataFetcher(uri: string){ Класс не имеет смысла
        return this.get(this.baseUrl+uri).then(res=> console.log(res));
    }*/

    dataParcer(elems:[object]){
        //elems.forEach(elem=>())
    }

    /*orderPost(cart:object){ //в документации 3 переменных. Класс не имеет смысла
        return this.post(this.baseUrl,cart).then(res=> console.log(res))
    }*/ 


}