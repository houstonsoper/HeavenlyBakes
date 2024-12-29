import Image from "next/image";
import React, {Dispatch, SetStateAction} from "react";
import BasketItem from "../interfaces/basketItem"
import {useState} from "react";
import {addToBasket, removeFromBasket} from "@/services/basketService";
import {useBasket} from "@/contexts/basketContext";

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
    
    return(
        <div className="w-3/4 m-auto flex p-3 border border-gray-200 rounded-lg my-8">
            <div className="flex justify-center">
                <Image src={item.imageUrl} alt={item.name} width={150} height={150}/>
            </div>
            <div className="flex flex-col px-6 w-full">
                <div className="flex">
                    <h1 className="t">{item.name}</h1>
                    <button className="material-symbols-outlined ms-auto" onClick={handleRemoveItem}> delete </button>
                </div>
                <p>Price: £{item.price.toFixed(2)}</p>
                <p>Quantity:{item.quantity}</p>
                <p>Total: £{item.totalPrice.toFixed(2)}</p>
                <div className="flex">
                    <button onClick={handleDecreaseQuantity}>
                        <span className="material-symbols-outlined">remove</span>
                    </button>
                    <button onClick={handleIncreaseQuantity}>
                        <span className="material-symbols-outlined">add</span>
                    </button>
                </div>
            </div>
        </div>
    )
}