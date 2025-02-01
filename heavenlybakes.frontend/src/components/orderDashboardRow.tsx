"use client"

import OrderWithOrderItems from "@/interfaces/orderWithOrderItems";
import {useEffect, useState} from "react";
import User from "@/interfaces/user";
import {fetchUserById} from "@/services/userService";
import OrderStatus from "@/interfaces/orderStatus";
import {Button} from "@/components/ui/button";
import {fetchBakeById} from "@/services/bakeService";
import Bake from "@/interfaces/bake";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export interface OrderDashboardRowProps {
    order: OrderWithOrderItems
    orderStatus: OrderStatus
}

export default function OrderDashboardRow({order, orderStatus}: OrderDashboardRowProps) {
    const [user, setUser] = useState<User | null>(null);
    const [bakes, setBakes] = useState<Bake[]>([]);
    
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
    
    const handleGetBakes = async () => {
        //Fetch all bakes using the array of bake ids in the order
        const fetchedBakes : (Bake | null)[] = await Promise.all(
            order.orderItems.map(async bake => {
                return await fetchBakeById(bake.bakeId);
            }));
        
        //Filter out null values from fetched bakes and set it in state
        setBakes(fetchedBakes.filter(b => b !== null));
    }
    
    return (
        <>
            {user ? (
                <tr>
                    <td className="border-b border-gray-300">{order.orderId}</td>
                    <td className="border-b border-gray-300">{user.forename} {user.surname}</td>
                    <td className="border-b border-gray-300">{user.email}</td>
                    <td className="border-b border-gray-300">{new Date(order.orderDate).toLocaleString()}</td>
                    <td className="border-b border-gray-300">{orderStatus.status}</td>
                    <td className="border-b border-gray-300">£{order.total.toFixed(2)}</td>
                    <td className="border-b border-gray-300 py-2">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button size="sm" variant="outline" onClick={handleGetBakes}>View Items</Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-full w-[50rem]">
                                <DialogHeader>
                                    <DialogTitle>Items</DialogTitle>
                                    <DialogDescription>
                                        <table className="w-full">
                                            <thead className="table-fixed w-full">
                                            <tr>
                                                <th className="text-pink-600">Bake</th>
                                                <th className="text-pink-600">Quantity</th>
                                                <th className="text-pink-600">Price</th>
                                                <th className="text-pink-600">Total price</th>
                                            </tr>
                                            </thead>
                                            <tbody className="table-fixed w-full">
                                            {bakes.map(bake => (
                                                <tr key={bake.id}>
                                                    <td className="text-black">{bake.name}</td>
                                                    <td className="text-black">
                                                        {order.orderItems.find(oi => oi.bakeId == bake.id)?.quantity}
                                                    </td>
                                                    <td className="text-black">£{bake.basePrice.toFixed(2)}</td>
                                                    <td className="text-black">
                                                        £{order.orderItems.find(oi => oi.bakeId === bake.id)?.price.toFixed(2)}
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <DialogClose>Back</DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </td>
                </tr>
            ) : null}
        </>
    )
}