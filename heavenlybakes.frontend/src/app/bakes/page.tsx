﻿"use client"

import Image from "next/image";
import {fetchBakes, fetchPopularBakes} from "@/services/bakeService";
import {useEffect, useState} from "react";
import Bake from "@/interfaces/bake";
import BakeCard from "../../components/bakeCard";
import {useSearchParams} from "next/navigation";
import {Search} from "lucide-react";
import BasketItem from "@/interfaces/basketItem";
import {addToBasket} from "@/services/basketService";

export default function Page() {
    const [bakes, setBakes] = useState<Bake[]>([]);
    const searchParams = useSearchParams();
    
    //Fetch Bakes
    useEffect(() => {
        const getBakes = async () => {

            //Get the search string from the search Params
            const searchTerm: string | null = searchParams.get("search");
            
            //Fetch bakes by search term if included, else fetch all
            const fetchedBakes: Bake[] = await fetchBakes(searchTerm ? {searchTerm} : {});
            setBakes(fetchedBakes);
        }
        getBakes();
    }, [searchParams])
    
    return (
        <div>
            <section className="py-12 bg-pink-50 py-10">
                    <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">Our Selections</h2>
                    <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                        Indulge in our wide array of delectable treats. From classic cakes to mouthwatering pastries,
                        we have something to satisfy every sweet tooth.
                    </p>
            </section>
            
            <section className="py-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-y-12">
                    {bakes.map((bake: Bake) => (<BakeCard key={bake.id} bake={bake}/>
                    ))}
                </div>
            </div>
            </section>
        </div>
    );
}