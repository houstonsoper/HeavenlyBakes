export interface Order {
    orderId: number;
    userId : string,
    orderDate: Date,
    orderStatus: number,
    paymentMethodId: number,
    shippingAddress: string,
    shippingCity: string,
    shippingPostCode: string,
    total: number,
}