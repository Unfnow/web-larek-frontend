import './scss/styles.scss';
import {EventEmitter} from "./components/base/events";
import {API_URL} from './utils/constants'
import {Api} from './components/base/api'
import { DataManager } from './components/DataManager'


const API= new Api(API_URL);

API.get('/product/').then(res=> console.log(res))

//console.log('hey')