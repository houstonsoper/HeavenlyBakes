export interface OrderForm {
    customerId: string,
    shippingAddress: string,
    shippingCity: string,
    shippingPostalCode: string,
    shippingCountry: string,
    paymentMethodId: number,
    orderItems : {bakeId : number, quantity: number}[],
}