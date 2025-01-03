import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import OrderWithOrderItems from "@/interfaces/orderWithOrderItems";
import Bake from "@/interfaces/bake";
import { fetchBakeById } from "@/services/bakeService";

interface OrderCardProps {
    order: OrderWithOrderItems;
}

export default function OrderCard({ order }: OrderCardProps) {
    const [bakes, setBakes] = useState<Bake[]>([]);

    useEffect(() => {
        const controller = new AbortController();
        const signal: AbortSignal = controller.signal;

        const getBakes = async () => {
            let bakesArray: Bake[] = [];

            if(order.orderItems) {
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

    return (
        <Card className="w-full overflow-hidden border-gray-100 rounded-none shadow-card my-4">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold text-pink-600">
                    Order #{order.orderId}
                </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
                {bakes.length > 0 ? (
                    <div className="space-y-4">
                        {bakes.map((bake: Bake) => (
                            <div key={bake.id} className="flex items-center space-x-4 py-2">
                                <div className="flex-shrink-0">
                                    <Image
                                        src={bake.imageUrl}
                                        alt={bake.name}
                                        width={80}
                                        height={80}
                                        className="rounded-md object-cover"
                                    />
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
                <div className="mt-4 pt-4 flex justify-between items-center">
                    <p className="text-sm text-gray-500">Order Total:</p>
                    <p className="text-lg font-bold text-pink-600">£{order.total.toFixed(2)}</p>
                </div>
            </CardContent>
        </Card>
    );
}
