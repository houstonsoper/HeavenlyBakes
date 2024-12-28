"use client"

import {useParams} from "next/navigation";
import {useState, useEffect} from "react";
import Bake from "@/interfaces/bake"
import Image from "next/image";
import Link from "next/link";
import {fetchBakeById} from "@/services/bakeService";
import {useRouter} from "next/navigation";
import BasketItem from "@/interfaces/basketItem";
import {createCookie, getCookie} from "@/services/cookieService";

export default function Details(){
    const [bake, setBake] = useState <Bake | null> (null);
    const params = useParams();
    const router = useRouter();
    
    useEffect(()=>{
        const getBake = async () => {
            const fetchedBake : Bake | null = await fetchBakeById(params.id as string);
            
            if(fetchedBake)
                setBake(fetchedBake);
        }
        getBake();
    }, [params.id])
    
    const addToBasketHandler = () =>{
        
        //Create a basketItem object with the details of the item
        if(bake) {
            const basketItem: BasketItem = {
                id: bake.id,
                name: bake.name,
                price: bake.price,
                quantity: 1,
                imageUrl: bake.imageUrl,
            };
            
            //Check if there is already items in the basket
            const existingBasket : object[] | null = getCookie("basket") || [];
            
            //Add basketItem to the basket and make a cookie
            const updatedBasket: object[] = [...existingBasket, basketItem];
            createCookie("basket", updatedBasket);
            
            router.push(`/basket`);
        }
        return null;
    }

    return bake ? (
        <div className="bake-container container m-auto block xl:flex justify-center">
            <div className="bake-image-container">
                <Image
                    className="bake-img"
                    src={bake.imageUrl}
                    alt={bake.name}
                    width={400}
                    height={400}
                />
            </div>
            <div className="bake-details-container ms-5">
                <div>
                    <h1>{bake.name}</h1>
                    <p className="price">£{bake.price.toFixed(2)}</p>
                </div>
                <div className="pt-2">
                    <p>{bake.description}</p>
                </div>
                <div className="checkout-link mt-6">
                    <button onClick={addToBasketHandler}>Add to Basket</button>
                </div>
                <div className="flex">
                    <button>
                        <span className="material-symbols-outlined">remove</span>
                    </button>
                    <p>quantity</p>
                    <button>
                        <span className="material-symbols-outlined">add</span>
                    </button>
                </div>
            </div>
        </div>
    ) : null;
}