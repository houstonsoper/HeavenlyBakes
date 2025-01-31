"use client"

import OrderWithOrderItems from "@/interfaces/orderWithOrderItems";
import {useEffect, useState} from "react";
import User from "@/interfaces/user";
import {fetchUserById} from "@/services/userService";
import OrderStatus from "@/interfaces/orderStatus";
export interface OrderDashboardRowProps {
    order: OrderWithOrderItems
    orderStatus: OrderStatus
}

export default function OrderDashboardRow({order, orderStatus}: OrderDashboardRowProps) {
    const [user, setUser] = useState<User | null>(null);
    
    //Fetch user information on mount
    useEffect(() => {
        const controller = new AbortController;
        const signal = controller.signal;
        
        const getUser = async () => {
            const user : User | null = await fetchUserById(order.userId, signal)
            setUser(user);
        }
        getUser();
        
        return () => controller.abort();
    }, [])
    return (
        <>
            {user ? (
            <tr>
                <td className="border-b border-gray-300">{order.orderId}</td>
                <td className="border-b border-gray-300">{user.forename} {user.surname}</td>
                <td className="border-b border-gray-300">{user.email}</td>
                <td className="border-b border-gray-300">{order.orderItems.map(oi => oi.bakeId).join(", ")}</td>
                <td className="border-b border-gray-300">{new Date(order.orderDate).toLocaleString()}</td>
                <td className="border-b border-gray-300">{orderStatus.status}</td>
                <td className="border-b border-gray-300">£{order.total.toFixed(2)}</td>
            </tr>
                ) : null}
        </>
    )
}