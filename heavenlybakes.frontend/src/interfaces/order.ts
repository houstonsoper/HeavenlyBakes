export interface Order {
    orderId: number;
    customer_id: string,
    orderDate: Date,
    orderStatus: number,
    paymentMethodId: number,
    shippingAddress: string,
    shippingCity: string,
    shippingPostCode: string,
    total: number,
}