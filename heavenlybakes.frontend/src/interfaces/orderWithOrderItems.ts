import {PaymentMethod} from "@/interfaces/paymentMethod";
import OrderStatus from "@/interfaces/orderStatus";

export interface OrderItem {
    bakeId : number,
    quantity: number,
    price: number,
}

export default interface OrderWithOrderItems {
    orderId : number,
    userId : string,
    orderDate : string,
    orderTime : string,
    shippingAddress: string,
    shippingCity: string,
    shippingPostCode: string,
    shippingCountry: string,
    total : number,
    orderStatusId: number,
    paymentMethodId : number,
    orderItems : OrderItem[],
}