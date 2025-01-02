import {Order} from "@/interfaces/order";
import {OrderForm} from "@/interfaces/orderForm";
import BasketItem from "@/interfaces/basketItem";
import {OrderItem} from "@/interfaces/orderItem";
import OrderWithOrderItems from "@/interfaces/orderWithOrderItems";

const BASE_URL: string = 'https://localhost:44367';

export async function postOrder(orderForm : OrderForm) : Promise<Order | null> {
    try {
        const url = `${BASE_URL}/Order`;
        const response : Response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderForm)
        });
        
        if (!response.ok) {
            throw new Error("Unable to Post order to API");
        }
        
        return await response.json();
    }
    catch (error) {
        console.error(error);
        return null;
    }
}

export async function postOrderItems(items : OrderItem[])  {
    try {
        const orderId : number = items[0].orderId;
        const url = `${BASE_URL}/Order/${orderId}`;
        const response: Response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(items)
        });
        
        if (!response.ok) {
            throw new Error("Unable to Post items in order to API");
        }
    } 
    catch(error){
        console.error(error);
    }
}

export async function getOrdersByCustomerId(customerId: string | undefined) : Promise<OrderWithOrderItems[] | []> {
    try {
        const url = `${BASE_URL}/Order/${customerId}`;
        const response : Response = await fetch(url);
        
        if (!response.ok) {
            throw new Error("Unable to get orders from API");
        }
        
        return await response.json();
    }
    catch (error) {
        console.error(error);
        return [];
    }
}