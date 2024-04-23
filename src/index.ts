import './scss/styles.scss';

import {API_URL} from './utils/constants'
import {Api} from './components/base/api'
import { DataManager } from './components/DataManager'


const API= new Api(API_URL);

API.get('/product/').then(res=> console.log(res))

//const dm= new DataManager(API_URL)
//dm.dataFetcher('/product/')
console.log('hey')