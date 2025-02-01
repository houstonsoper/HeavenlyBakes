import {Order} from "@/interfaces/order";
import {OrderForm} from "@/interfaces/orderForm";
import BasketItem from "@/interfaces/basketItem";
import {OrderItem} from "@/interfaces/orderItem";
import OrderWithOrderItems from "@/interfaces/orderWithOrderItems";
import GroupedOrders from "@/interfaces/groupedOrders";
import OrdersParams from "@/interfaces/ordersParams";

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

export async function getOrdersByUserId(userId: string | undefined, signal? : AbortSignal) : Promise<OrderWithOrderItems[] | []> {
    try {
        const url = `${BASE_URL}/Order/${userId}`;
        const response : Response = await fetch(url, {signal});
        
        if (!response.ok) {
            throw new Error("Unable to get orders from API");
        }
        
        const data : OrderWithOrderItems[] = await response.json();
        
        //Map over each order to format the data and time properties, then return a new order object
        return data.map((order : OrderWithOrderItems) : OrderWithOrderItems => {
            const date = new Date(order.orderDate);
            const dateOnly : string = date.toDateString(); 
            const timeOnly : string = date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}); 
            
            return{...order, orderDate: dateOnly, orderTime: timeOnly};
        });
    }
    catch (error) {
        if(error instanceof DOMException && error.message === "AbortError"){
            console.log("Fetch request aborted");
        }
        else if (error instanceof Error){
            console.error(error);
        }
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
    const groupedOrdersSortedByDate : GroupedOrders[] =  groupedOrders.sort((a : GroupedOrders, b : GroupedOrders) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    
    // Sort the orders in the groups by orderId
    groupedOrdersSortedByDate.forEach(groupedOrders => {
        groupedOrders.orders.sort((a: OrderWithOrderItems, b: OrderWithOrderItems) => {
            return b.orderId - a.orderId;
        });
    });

    return groupedOrdersSortedByDate;
}

export async function fetchOrders (
    {search = "", statusId = 0, offset = 0, limit = 0, fromDate}: OrdersParams, signal? : AbortSignal): Promise<OrderWithOrderItems[] | []>  {
    try{
        debugger;
        const url : string = BASE_URL + `/Order/Search?search=${search}&statusId=${statusId}&offset=${offset}&limit=${limit}&fromDate=${fromDate}`;
        const response : Response = await fetch(url, {signal});
        
        if (!response.ok) {
            throw new Error("Unable to get orders from API");
        }
        return await response.json();
    } catch(error){
        if (error instanceof DOMException && error.message === "AbortError"){
            console.log("Fetch request aborted");
        } else {
            console.error(error);
        }
        return [];
    }
}

export async function updateOrderStatus (orderId : number, orderStatusId : number) : Promise<void> {
    try {
        const url: string = BASE_URL + `/Order/${orderId}/UpdateStatus`;

        const response: Response = await fetch(url, {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(orderStatusId),
        });
        
        if(!response.ok) {
            throw new Error("Unable to update order status");
        }
    } catch(error){
        console.error(error);
    }
}
