
"use client";

import BasketItem from "@/interfaces/basketItem";
import BasketItemComponent from "@/components/basketItem";
import {useBasket} from "@/contexts/basketContext";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export default function Page(){
    const { basket, basketCount, total} = useBasket();
    //test3
    
    return(
        <main>
        <div className="container m-auto pt-5">
            <div className="grid lg:grid-cols-[2fr_1fr]">
                <div>
                    {basketCount > 0 ? (
                        basket.items.map((item: BasketItem) => (
                            <BasketItemComponent key={item.id} item={item}/>
                        ))) : (<p className="text-center">No items in Basket</p>)
                    }
                </div>
                <div>
                    <div className="border rounded px-5 py-3 m-auto w-3/4">
                        <h1>Order details</h1>
                        <div className="leading-loose">
                            <p>Items: {basketCount}</p>
                            {/*If there is a discount, display total amount saved*/}
                            {basket.items.some(item => item.discount) && (
                                <p className="text-red-600 font-semibold">
                                    Saved: £{(
                                    basket.items.reduce(
                                        (acc: number, item: BasketItem) =>
                                            acc + item.basePrice * item.quantity,
                                        0
                                    ) - basket.total
                                ).toFixed(2)}
                                </p>
                            )}
                            <p className="font-bold">Total: £{total.toFixed(2)}</p>
                        </div>
                        <Link href="/checkout">
                        <Button className="mt-2 bg-pink-500 hover:bg-pink-600 w-full rounded">Checkout</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}