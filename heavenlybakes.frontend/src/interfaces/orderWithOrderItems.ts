import {PaymentMethod} from "@/interfaces/paymentMethod";

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
    orderStatus: number,
    paymentMethod : PaymentMethod,
    orderItems : OrderItem[],
}