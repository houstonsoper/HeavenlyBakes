export interface OrderItem {
    bakeId : number,
    quantity: number,
    price: number,
}

export default interface OrderWithOrderItems {
    orderId : number,
    customerId : string,
    orderDate : string,
    orderTime : string,
    shippingAddress: string,
    shippingCity: string,
    shippingPostCode: string,
    shippingCountry: string,
    total : number,
    orderStatus: number,
    paymentMethod : number,
    orderItems : OrderItem[],
}