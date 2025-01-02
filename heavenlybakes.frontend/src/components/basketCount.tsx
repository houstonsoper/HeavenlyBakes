import Link from "next/link";
import {useEffect, useState} from "react";
import {getBasketCount} from "@/services/basketService";
import {useBasket} from "@/contexts/basketContext";

export default function BasketCount() {
    const {basketCount} = useBasket();
    
    return(
    <Link className="relative flex text-pink-600" href="/basket">
        <span className="material-symbols-outlined">
            shopping_bag
        </span>
        <p className="absolute left-6 bottom-2">{basketCount}</p>
    </Link>
    );
}