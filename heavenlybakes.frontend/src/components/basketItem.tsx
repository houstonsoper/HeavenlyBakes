import Image from "next/image";
import React, {Dispatch, SetStateAction} from "react";
import BasketItem from "../interfaces/basketItem"
import {useState} from "react";
import {addToBasket, removeFromBasket} from "@/services/basketService";
import {useBasket} from "@/contexts/basketContext";
import { Card } from "./ui/card";
import {CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from "next/link";

interface BasketItemComponentProps{
    item: BasketItem,
}

export default function BasketItemComponent({item} :BasketItemComponentProps) {
    const { increaseQuantity, decreaseQuantity, removeFromBasket } = useBasket();
    
    const handleDecreaseQuantity = () => {
        decreaseQuantity(item);
    };
    
    const handleIncreaseQuantity = () => {
        increaseQuantity(item);
    };
    
    const handleRemoveItem = () => {
        removeFromBasket(item);
    }
    
    return (
        <Card className="mb-4">
            <CardContent className="p-4 flex items-center">
                <Link href={`bakes/${item.id}`}>
                    <Image
                        src={item.imageUrl}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="rounded-md mr-4"
                    />
                </Link>
                <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-pink-600">{item.name}</h3>
                    <div className="flex">
                        {item.discount ? (
                            <p className="text-red-600 line-through me-1 font-semibold">
                                £{item.basePrice.toFixed(2)}
                            </p>
                        ) : null}
                        <p>£{item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center mt-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleDecreaseQuantity}
                            disabled={item.quantity <= 1}
                            className="hover:bg-gray-50"
                        >
                            <span className="material-symbols-outlined">
                                remove
                            </span>
                        </Button>
                        <span className="mx-3">{item.quantity}</span>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleIncreaseQuantity}
                            className="hover:bg-gray-50"
                        >
                            <span className="material-symbols-outlined">
                                add
                            </span>
                        </Button>
                    </div>
                </div>
                <div className="text-right">
                    {/*If there is a discount, display the price of the item before the discount*/}
                    {item.discount ? (
                        <p className="line-through">
                            £{(item.quantity * item.basePrice).toFixed(2)}
                        </p>
                    ): null}
                    {/*If there is a discount, display the price of the item after the discount*/}
                    <p className={item.discount ? "text-red-600 font-semibold" : ""}>£{item.totalPrice.toFixed(2)}</p>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleRemoveItem}
                        className="text-red-500 hover:text-red-700"
                    >
                        Remove
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}