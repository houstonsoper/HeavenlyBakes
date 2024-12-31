
"use client";

import BasketItem from "@/interfaces/basketItem";
import BasketItemComponent from "@/components/basketItem";
import {useBasket} from "@/contexts/basketContext";
import Link from "next/link";

export default function Page(){
    const { basket, basketCount, total} = useBasket();
    
    return(
        <div className="container m-auto">
            <div className="grid lg:grid-cols-[2fr_1fr]">
                <div>
                    {basketCount > 0 ? (
                        basket.items.map((item: BasketItem) => (
                            <BasketItemComponent key={item.id} item={item}/>
                        ))) : (<p className="text-center">No items in Basket</p>)
                    }
                </div>
                <div>
                    <div className="border my-8 px-5 py-3 m-auto w-3/4">
                        <h1>Order details</h1>
                        <div className="leading-loose">
                            <p>Items: {basketCount}</p>
                            <p className="font-bold">Total: £{total.toFixed(2)}</p>
                        </div>
                            <Link href="/checkout">
                                <button className="mt-2 bg-orange-300 w-full rounded">Checkout</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
    );
}