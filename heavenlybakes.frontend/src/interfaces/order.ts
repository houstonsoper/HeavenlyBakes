import OrderStatus from "@/interfaces/orderStatus";
import {PaymentMethod} from "@/interfaces/paymentMethod";

export interface Order {
    orderId: number;
    userId : string,
    orderDate: Date,
    orderStatus : OrderStatus,
    paymentMethod: PaymentMethod,
    shippingAddress: string,
    shippingCity: string,
    shippingPostCode: string,
    total: number,
}