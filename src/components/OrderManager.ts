import {CartModel} from'./base/Model'
class OrderManagers extends CartModel{ //В документации не наследуется
    constructor(cart:CartModel){
        super()
    }
    cartDelete(elem:object){
       //CartModel.prototype.orders.remove(CartModel.prototype.orders.find(elem))
    }
    cartClear(){
        //решить вопрос или просто переписывать каждый раз данные
    }
}