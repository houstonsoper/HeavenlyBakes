﻿
"use client";

import React, {useState, useEffect} from "react";
import BasketItem from "@/interfaces/basketItem";
import {getCookie} from "@/services/cookieService";
import BasketItemComponent from "@/components/basketItem";
import {getExistingBasket} from "@/services/basketService";
import Basket from "@/interfaces/basket";

export default function Page(){
    const [basket, setBasket] = useState<Basket>({items:[], total: 0});
    const [updateBasket, setUpdateBasket] = useState<boolean>(false);
    
    //Get basket on page load/when an update is made to it
    useEffect(() => {
        const existingBasket : Basket = getExistingBasket();
        setBasket(existingBasket);
        setUpdateBasket(false);
    }, [updateBasket]);
    
    const handleBasketUpdate = () => {
        setUpdateBasket(true);
    }
    
    return(
        <div className="container m-auto">
            {basket.items.length > 0 ? (
                basket.items.map((item: BasketItem) => (
                    <BasketItemComponent key={item.id} item={item} updateBasket={handleBasketUpdate}/>
                ))) : (<p className="text-center">No items in Basket</p>)
            }
            <h1 className="text-center">Total: £{basket.total.toFixed(2)}</h1>
        </div>
    );
}