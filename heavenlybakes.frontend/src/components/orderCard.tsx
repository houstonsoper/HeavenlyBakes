"use client"

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import Image from "next/image";
import React, {useEffect, useState} from "react";
import OrderWithOrderItems from "@/interfaces/orderWithOrderItems";
import Bake from "@/interfaces/bake";
import {fetchBakeById} from "@/services/bakeService";
import Link from "next/link";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Review from "@/interfaces/review";
import {useRouter} from "next/navigation";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import router from "next/navigation";

interface OrderCardProps {
    order: OrderWithOrderItems;
    reviews: Review[];
}

export default function OrderCard({order, reviews}: OrderCardProps) {
    const [bakes, setBakes] = useState<Bake[]>([]);
    const router : AppRouterInstance = useRouter();

    useEffect(() => {
        const controller = new AbortController();
        const signal: AbortSignal = controller.signal;

        const getBakes = async () => {
            let bakesArray: Bake[] = [];
            
            if (order.orderItems) {
                for (const item of order.orderItems) {
                    const bake: Bake | null = await fetchBakeById(item.bakeId, signal);
                    if (bake !== null) {
                        bakesArray.push(bake);
                    }
                }
            }
            setBakes(bakesArray);
        }
        getBakes();
        return () => controller.abort();
    }, [order]);
    
    const handleReview = () => {
        const orderString : string = encodeURIComponent(JSON.stringify(order.orderItems.map(o => o.bakeId)));
        router.push(`/reviews?items=${orderString}`);
    }
    return (
        <Card className="w-full overflow-hidden  rounded shadow-card my-4">
            <CardHeader className="pb-2">
                <div className="flex">
                    <CardTitle className="text-pink-700">
                        {order.orderStatusId}
                    </CardTitle>
                    {/*OrderID, with Modal that displays order details*/}
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <CardTitle className="ms-auto text-pink-700 hover:text-pink-800 cursor-pointer ">Order
                                #{order.orderId}</CardTitle>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle className="flex">
                                    <div className="text-pink-700">Order details</div>
                                    <AlertDialogCancel className="ms-auto">
                                        <span className="material-symbols-outlined">
                                            close
                                        </span>
                                    </AlertDialogCancel>
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    <ul>
                                        <li>
                                            <strong>Address: </strong>
                                            {order.shippingAddress}
                                        </li>
                                        <li>
                                            <strong>City: </strong>
                                            {order.shippingCity}
                                        </li>
                                        <li>
                                            <strong>Postcode: </strong>
                                            {order.shippingPostCode}
                                        </li>
                                        <li>
                                            <strong>Country: </strong>
                                            {order.shippingCountry}
                                        </li>
                                        <li>
                                            <strong>Payment Method: </strong>
                                            {order.paymentMethodId}
                                        </li>
                                    </ul>
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </CardHeader>
            <CardContent className="p-4">
                {bakes.length > 0 ? (
                    <div className="space-y-4">
                        {bakes.map((bake: Bake) => (
                            <div key={bake.id} className="flex items-center space-x-4 py-2">
                                <div className="flex-shrink-0">
                                    <Link href={`/bakes/${bake.id}`}>
                                        <Image
                                            src={bake.imageUrl}
                                            alt={bake.name}
                                            width={80}
                                            height={80}
                                            className="rounded-md object-cover"
                                        />
                                    </Link>
                                </div>
                                <div className="flex-grow">
                                    <h3 className="font-medium text-pink-600">{bake.name}</h3>
                                    <p className="text-sm text-gray-500">
                                        Quantity: {order.orderItems.find(item => item.bakeId === bake.id)?.quantity || 0}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold text-pink-600">
                                        £{(bake.price * (order.orderItems.find(item => item.bakeId === bake.id)?.quantity || 0)).toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500 py-4">No bakes in this order</p>
                )}
                <div>
                    <button onClick={handleReview}>
                        <p>Write a review</p>
                    </button>
                </div>
                <div className="mt-4 pt-4 flex justify-between items-center">
                    <p className="text-sm text-gray-500">Order Total:</p>
                    <p className="text-lg font-bold text-pink-600">£{order.total.toFixed(2)}</p>
                </div>
            </CardContent>
        </Card>
    );
}
