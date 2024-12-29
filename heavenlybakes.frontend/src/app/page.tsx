"use client"

import Image from "next/image";
import {fetchBakes, fetchPopularBakes} from "@/services/bakeService";
import {useEffect, useState} from "react";
import Bake from "@/interfaces/bake";
import BakeCard from "../components/bakeCard";

export default function Home() {
    const [bakes, setBakes] = useState<Bake[]>([]);

    //Fetch Popular Bakes from API on page load
    useEffect(() => {
        const getBakes = async () => {
            const fetchedBakes: Bake[] = await fetchPopularBakes(20);
            setBakes(fetchedBakes);
        }
        getBakes();
    }, [])

    return (
        <div className="container m-auto py-12">
            <section>
                <Image className={"pb-3 "} src={"https://placehold.co/1900x600/png"} alt={"carousel"} width={1900} height={600} />
            </section>
            <section>
            <div>
                <h1 className="text-center pb-4">Popular</h1>
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-y-12">
                    {bakes.map((bake: Bake) => (<BakeCard key={bake.id} bake={bake}/>
                    ))}
                </div>
            </div>
            </section>
        </div>
    );
}
