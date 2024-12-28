"use client"

import {useParams} from "next/navigation";
import {useState, useEffect} from "react";
import Bake from "@/interfaces/bake"
import Image from "next/image";
import {fetchBakeById} from "@/services/bakeService";
import {useRouter} from "next/navigation";
import BasketItem from "@/interfaces/basketItem";
import {Params} from "next/dist/server/request/params";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {addToBasket} from "@/services/basketService";
import Basket from "@/interfaces/basket";

export default function Details(){
    const [bake, setBake] = useState <Bake | null> (null);
    const params : Params = useParams();
    const router : AppRouterInstance = useRouter();
    const [quantity, setQuantity] = useState<number>(1);
    const [basket, setBasket] = useState<Basket | null>(null);
    
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
                quantity: quantity,
                imageUrl: bake.imageUrl,
                totalPrice: bake.price * quantity,
            };
            addToBasket(basketItem);
            
            
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
                    <button onClick={() => quantity != 1 ? setQuantity(quantity - 1) : null}>
                        <span className="material-symbols-outlined">remove</span>
                    </button>
                    <p>{quantity}</p>
                    <button onClick={() => setQuantity(quantity + 1)}>
                        <span className="material-symbols-outlined">add</span>
                    </button>
                </div>
            </div>
        </div>
    ) : null;
}