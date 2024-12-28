
"use client";

import React, {useState, useEffect} from "react";
import BasketItem from "@/interfaces/basketItem";
import BakeCard from "@/components/bakeCard";
import Image from "next/image";
import {getCookie} from "@/services/cookieService";

export default function Basket(){
    const [basketItem, setBasketItem] = useState<BasketItem[]>([]);
    
    useEffect(() => {
        setBasketItem(getCookie("basket"));
    }, []);
    return(
        <div className="container">
        {basketItem.length > 0 ? (
            basketItem.map((item: BasketItem) => (
                <div key={item.id}>
                    <Image src={item.imageUrl} alt={item.name} width={100} height={100} /> 
                    <h1>{item.name}</h1>
                    <p>£{item.price.toFixed(2)}</p>
                    <p>Quantity:{item.quantity}</p>
                </div>
            ))) : (<p className="text-center">No items in Basket</p>)
        }
        </div>
    );
}