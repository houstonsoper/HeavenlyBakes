import Image from "next/image";
import React, {Dispatch, SetStateAction} from "react";
import BasketItem from "../interfaces/basketItem"
import {useState} from "react";
import {addToBasket, removeFromBasket} from "@/services/basketService";
import {useBasket} from "@/contexts/basketContext";
import { Card } from "./ui/card";
import {CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";

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
                <Image
                    src={item.imageUrl}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-md mr-4"
                />
                <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-pink-600">{item.name}</h3>
                    <p className="text-gray-600">£{item.price.toFixed(2)} each</p>
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
                    <p className="font-semibold text-pink-600">£{item.totalPrice.toFixed(2)}</p>
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