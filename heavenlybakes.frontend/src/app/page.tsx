"use client"

import Image from "next/image";
import {fetchBakes, fetchPopularBakes} from "@/services/bakeService";
import React, {useEffect, useState} from "react";
import Bake from "@/interfaces/bake";
import BakeCard from "../components/bakeCard";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import PageHeader from "@/components/pageHeader";

export default function Home() {
    const [bakes, setBakes] = useState<Bake[]>([]);

    //Fetch Popular Bakes from API on page load
    useEffect(() => {
        const controller = new AbortController();
        const signal : AbortSignal = controller.signal;
        
        const getBakes = async () => {
            const fetchedBakes: Bake[] = await fetchPopularBakes(20, signal);
            setBakes(fetchedBakes);
        }
        getBakes();
        
        //Cleanup function to abort fetch when component unmounts
        return () => controller.abort();
    }, [])
    
    
    return (
        <main>
            {bakes.length > 0 ? (
                <div className="flex flex-col min-h-screen">
                    <section id="home" className="bg-pink-50 py-20">
                        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
                            <div className="md:w-1/2 mb-10 md:mb-0">
                                <h2 className="text-4xl font-bold text-pink-600 mb-4">Delicious Bakes for Every
                                    Occasion</h2>
                                <p className="text-lg mb-6">Indulge in our handcrafted bakes made with love and the finest
                                    ingredients.</p>
                                <Link href="/bakes">
                                <Button className="bg-pink-500 hover:bg-pink-600 text-white">Order Now</Button>
                                </Link>
                            </div>
                            <div className="md:w-1/2">
                                <Image src={bakes[0].imageUrl} width={600} height={400} alt="Featured Cake"
                                       className="rounded-lg shadow-lg"/>
                            </div>
                        </div>
                    </section>
    
                    <section id="cakes" className="py-20">
                        <div className="container mx-auto px-4">
                            <h2 className="text-3xl font-bold text-center text-pink-600 mb-10">Our Popular Bakes</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {bakes.slice(12, 15).map((bake: Bake) => (
                                    <Link 
                                        href={"bakes/" + bake.id}
                                        key={bake.id} 
                                        className="bg-white rounded-lg shadow-md overflow-hidden"
                                    >
                                        <Image src={bake.imageUrl} width={400} height={300} alt={bake.name}
                                               className="w-full"/>
                                        <div className="p-4">
                                            <h3 className="text-xl font-semibold mb-2">{bake.name}</h3>
                                            <p className="text-gray-">{bake.description}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
                ) : null }
        </main>
    )
}

