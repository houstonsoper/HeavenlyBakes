"use client"

import PageHeader from "@/components/pageHeader";
import {getOrdersByCustomerId} from "@/services/orderService";
import {useEffect, useState} from "react";
import orderWithOrderItems from "@/interfaces/orderWithOrderItems";
import {useUser} from "@auth0/nextjs-auth0/client";

export default function orders(){
    const [orders, setOrders] = useState<orderWithOrderItems[]>([]);
    const {user} = useUser();
    
    useEffect(() => {
        const getOrders  = async () => {
            if (user && user.sub != null) {
                const data : orderWithOrderItems[] | [] = await getOrdersByCustomerId(user.sub);
                setOrders(data);
            }
        }
        getOrders();
    }, [user])

    console.log("orders", orders);
    
    return(
        <main>
            <PageHeader title="Orders" description="Keep track of all your orders in one place."/>
        </main>
    )
}