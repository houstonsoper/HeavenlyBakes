import {Order} from "@/interfaces/order";

const BASE_URL: string = 'https://localhost:44367';

import {OrderForm} from "@/interfaces/orderForm";

export async function postOrder(orderForm : OrderForm) : Promise<Order | null> {
    debugger;
    try {
        const url = `${BASE_URL}/AddOrder`;
        const response = await fetch(url, {
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
