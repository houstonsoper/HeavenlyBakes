import Image from "next/image";
import React, {Dispatch, SetStateAction} from "react";
import BasketItem from "../interfaces/basketItem"
import {useState, useEffect} from "react";
import {addToBasket, getExistingBasket, removeFromBasket} from "@/services/basketService";
import Basket from "@/interfaces/basket";

interface BasketItemComponentProps{
    item: BasketItem,
    updateBasket: () => void;
}

export default function BasketItemComponent({item, updateBasket} :BasketItemComponentProps) {
    const [quantity, setQuantity] = useState<number>(item.quantity);
    const [basket, setBasket] = useState<Basket>({items:[], total:0});
    
    //Get the basket
    useEffect(() => {
        const existingBasket : Basket = getExistingBasket();
        setBasket(existingBasket);
    }, []);
    
    const handleDecreaseQuantity = () => {
        if(quantity > 1){
            //Update quantity displayed on the screen
            setQuantity(quantity - 1) 

            //Update the item quantity and total price then refresh the basket 
            item.quantity = item.quantity - 1;
            item.totalPrice = item.quantity * item.price;
            removeFromBasket(item);
            addToBasket(item);
        } else {
            removeFromBasket(item);
        }
        updateBasket();
    }
    
    const handleIncreaseQuantity = () => {
        //Update quantity displayed on the screen
        setQuantity(quantity + 1);

        //Update the item quantity and total price then refresh the basket 
        item.quantity = item.quantity + 1;
        item.totalPrice = item.quantity * item.price;
        removeFromBasket(item);
        addToBasket(item);

        updateBasket();
    }
    
    return(
        <div className="w-1/2 m-auto flex p-3 border border-gray-200 rounded-lg my-8">
            <div>
                <Image src={item.imageUrl} alt={item.name} width={100} height={100}/>
            </div>
            <div className="flex flex-col px-4 w-full">
                <div className="flex">
                    <h1 className="t">{item.name}</h1>
                    <span className="material-symbols-outlined ms-auto"> delete </span>
                </div>
                <p>Price: £{item.price.toFixed(2)}</p>
                <p>Quantity:{quantity}</p>
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