"use client"

import {useParams} from "next/navigation";
import {useState, useEffect} from "react";
import Bake from "../../../../interfaces/bake";
import Image from "next/image";
import Link from "next/link";
import {fetchBakeById} from "../../../../services/bakeService";

export default function Details(){
    const [bake, setBake] = useState <Bake | null> (null);
    const params = useParams();
    
    useEffect(()=>{
        const getBake = async () => {
            const fetchedBake : Bake | null = await fetchBakeById(params.id as string);
            
            if(fetchedBake)
                setBake(fetchedBake);
        }
        getBake();
    }, [params.id])

    return bake ? (
        <div className="bake-container container m-auto block xl:flex">
            <div className="bake-image-container">
                <Image
                    className="bake-img"
                    src={bake.imageUrl}
                    alt={bake.name}
                    width={400}
                    height={400}
                />
            </div>
            <div className="bake-details-container">
                <div>
                    <h1>{bake.name}</h1>
                    <p className="price">£{bake.price.toFixed(2)}</p>
                </div>
                <div className="pt-2">
                    <p>{bake.description}</p>
                </div>
                <div className="checkout-link mt-6">
                    Add to Basket
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