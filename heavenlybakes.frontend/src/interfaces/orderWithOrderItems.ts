export interface OrderItem {
    bakeId : number,
    quantity: number,
    price: number,
}

export default interface OrderWithOrderItems {
    orderId : number,
    customerId : string,
    orderDate : Date,
    shippingAddress: string,
    shippingCity: string,
    shippingPostCode: string,
    shippingCountry: string,
    total : number,
    orderStatus: number,
    paymentMethod : number,
    OrderItems : OrderItem[],
}