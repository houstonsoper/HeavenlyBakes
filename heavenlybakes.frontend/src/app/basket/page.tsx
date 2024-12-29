
"use client";

import React, {useState, useEffect} from "react";
import BasketItem from "@/interfaces/basketItem";
import {getCookie} from "@/services/cookieService";
import BasketItemComponent from "@/components/basketItem";
import {getExistingBasket} from "@/services/basketService";
import Basket from "@/interfaces/basket";
import {useBasket} from "@/contexts/basketContext";

export default function Page(){
    const { basket, total, updateBasket } = useBasket();
    
    return(
        <div className="container m-auto">
            {basket.items.length > 0 ? (
                basket.items.map((item: BasketItem) => (
                    <BasketItemComponent key={item.id} item={item}/>
                ))) : (<p className="text-center">No items in Basket</p>)
            }
            <h1 className="text-center">Total: £{basket.total.toFixed(2)}</h1>
        </div>
    );
}