"use client"

import OrderWithOrderItems from "@/interfaces/orderWithOrderItems";
import {ChangeEvent, useEffect, useState} from "react";
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
import {updateOrderStatus} from "@/services/orderService";
import {useUser} from "@/contexts/userContext";
import Alert from "@/components/alert";

export interface OrderDashboardRowProps {
    order: OrderWithOrderItems
    orderStatus: OrderStatus
    orderStatuses: OrderStatus[]
}

export default function OrderDashboardRow({order, orderStatus, orderStatuses}: OrderDashboardRowProps) {
    const {auth} = useUser();
    const [customer, setCustomer] = useState<User | null>(null);
    const [bakes, setBakes] = useState<Bake[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<number>(orderStatus.id);
    
    //Fetch customer information on mount
    useEffect(() => {
        const controller = new AbortController;
        const signal = controller.signal;
        
        const getCustomer = async () => {
            setCustomer(await fetchUserById(order.userId, signal));
        }
        getCustomer();
        
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
    
    const handleOrderUpdate = async () => {
        await updateOrderStatus(order.orderId, selectedStatus);
    }
    
    return (
        <>
            {customer ? (
                <tr className="border-b border-grey-200 hover:bg-grey-50">
                    <td className="px-4 py-2">{order.orderId}</td>
                    <td className="px-4 py-2">{customer.forename} {customer.surname}</td>
                    <td className="px-4 py-2">{customer.email}</td>
                    <td className="px-4 py-2">{new Date(order.orderDate).toLocaleString()}</td>
                    <td className="px-4 py-2">
                        <select 
                            value={selectedStatus ?? orderStatus.status} 
                            onChange={(e : ChangeEvent<HTMLSelectElement>) => setSelectedStatus(Number(e.target.value))}
                            className="w-full p-1 border rounded-md shadow-sm"
                        >
                            {orderStatuses.map(status => (
                                <option 
                                    key={status.id} 
                                    value={status.id}
                                >
                                    {status.status}
                                </option>
                            ))}
                        </select>
                    </td>
                    <td className="border-b border-gray-300">£{order.total.toFixed(2)}</td>
                    <td className="border-b border-gray-300 py-2 flex gap-2">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button size="sm" className="m-1 bg-gray-100 hover:bg-gray-200 gap-1 text-black" onClick={handleGetBakes}>Items
                                    <span className="material-symbols-outlined">
                                        shopping_bag
                                    </span>
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-full w-[50rem]">
                                <DialogHeader>
                                    <DialogTitle className="text-2xl font-bold text-pink-600">Items</DialogTitle>
                                    <DialogDescription>
                                        <table className="w-full mt-4">
                                            <thead className="table-fixed w-full">
                                            <tr className="bg-grey-100">
                                                <th className="px-4 py-2 text-left text-pink-600">Bake</th>
                                                <th className="px-4 py-2 text-left text-pink-600">Quantity</th>
                                                <th className="px-4 py-2 text-left text-pink-600">Price</th>
                                                <th className="px-4 py-2 text-left text-pink-600">Total price</th>
                                            </tr>
                                            </thead>
                                            <tbody className="table-fixed w-full">
                                            {bakes.map(bake => (
                                                <tr key={bake.id}> 
                                                    <td className="px-4 py-2">{bake.name}</td>
                                                    <td className="px-4 py-2">
                                                        {order.orderItems.find(oi => oi.bakeId == bake.id)?.quantity}
                                                    </td>
                                                    <td className="px-4 py-2">£{bake.basePrice.toFixed(2)}</td>
                                                    <td className="px-4 py-2">
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
                        {auth.user?.userGroup.groupName === "Admin" && (
                        <Alert
                            buttonIcon="update"  
                            buttonText="Update"
                            title="Update Order"
                            description="Are you sure you want to update the status of this order?"
                            action={handleOrderUpdate}
                            className="m-1 bg-pink-700 hover:bg-pink-900 gap-1 text-white"
                            cancelText="No"
                            continueText="Yes"
                        />
                        )}
                    </td>
                </tr>
            ) : null}
        </>
    )
}