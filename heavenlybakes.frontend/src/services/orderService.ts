﻿import {Order} from "@/interfaces/order";
import {OrderForm} from "@/interfaces/orderForm";
import BasketItem from "@/interfaces/basketItem";
import {OrderItem} from "@/interfaces/orderItem";
import OrderWithOrderItems from "@/interfaces/orderWithOrderItems";
import GroupedOrders from "@/interfaces/groupedOrders";

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

export async function getOrdersByCustomerId(customerId: string | undefined, signal? : AbortSignal) : Promise<OrderWithOrderItems[] | []> {
    try {
        const url = `${BASE_URL}/Order/${customerId}`;
        const response : Response = await fetch(url, {signal});
        
        if (!response.ok) {
            throw new Error("Unable to get orders from API");
        }
        
        const data : OrderWithOrderItems[] = await response.json();
        
        return data.map((order : OrderWithOrderItems) : OrderWithOrderItems => {
            const date = new Date(order.orderDate);
            const dateOnly : string = date.toDateString(); 
            const timeOnly : string = date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}); 
            
            return{...order, orderDate: dateOnly, orderTime: timeOnly};
        });
    }
    catch (error) {
        console.error(error);
        return [];
    }
}

export function groupOrdersByDate (orders : OrderWithOrderItems[]) : GroupedOrders[]{
    const groupedOrders : GroupedOrders[] = orders.reduce((acc : GroupedOrders[], order : OrderWithOrderItems) => {
        
        //Find if a group for this date already exists
        const existingGroup : GroupedOrders | undefined = acc.find(group => group.date === order.orderDate);
        
        //If the group exists push the order into it
        if(existingGroup) {
            existingGroup.orders.push(order);
        } else {
            //If no group exists, create one
            acc.push({date : order.orderDate, orders: [order]});
        }
        return acc;
    }, []);
    //Sort the groups by date
    return groupedOrders.sort((a : GroupedOrders, b : GroupedOrders) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}
