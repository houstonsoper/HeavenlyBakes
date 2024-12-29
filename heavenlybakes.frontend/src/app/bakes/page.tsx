"use client"

import Image from "next/image";
import {fetchBakes, fetchPopularBakes} from "@/services/bakeService";
import {useEffect, useState} from "react";
import Bake from "@/interfaces/bake";
import BakeCard from "../../components/bakeCard";
import {useSearchParams} from "next/navigation";

export default function Page() {
    const [bakes, setBakes] = useState<Bake[]>([]);
    const searchParams = useSearchParams();
    
    //Fetch Bakes
    useEffect(() => {
        const getBakes = async () => {

            //Get the search string from the search Params
            const searchString: string | null = searchParams.get("search");
            
            //Fetch bakes by search term if included
            if(searchString) {
                const fetchedBakes: Bake[] = await fetchBakes({searchTerm: searchString});
                setBakes(fetchedBakes);
            }
            return;
        }
        getBakes();
    }, [searchParams])

    return (
        <div className="container m-auto py-12">
            <div>
                <h1 className="text-center pb-4">Popular</h1>
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-y-12">
                    {bakes.map((bake: Bake) => (<BakeCard key={bake.id} bake={bake}/>
                    ))}
                </div>
            </div>
        </div>
    );
}