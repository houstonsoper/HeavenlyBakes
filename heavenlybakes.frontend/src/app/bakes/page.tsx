﻿"use client"

import {fetchBakes, fetchPopularBakes} from "@/services/bakeService";
import {RefObject, useEffect, useRef, useState} from "react";
import Bake from "@/interfaces/bake";
import BakeCard from "../../components/bakeCard";
import {useSearchParams} from "next/navigation";
import PageHeader from "@/components/pageHeader";
import {Button} from "@/components/ui/button";

export default function Page() {
    const [bakes, setBakes] = useState<Bake[]>([]);
    const searchParams = useSearchParams();
    const [filter, setFilter] = useState("");
    const [bakeType, setBakeType] = useState<string>("");
    const searchTermRef : RefObject<string | null> = useRef<string | null>(null);
    const limit = 10;
    
    //Fetch Bakes
    useEffect(() => {
        const getBakes = async () => {

            //Get the searchParam for search term and type
            const searchTerm: string | null = searchParams.get("search");
            const type: string | null = searchParams.get("type");

            //Fetch bakes by search term/type if included, else fetch all
            const fetchedBakes: Bake[] = await fetchBakes({
                searchTerm: searchTerm ?? undefined,
                type: type ?? undefined,
                limit: limit,
            });
            setBakes(fetchedBakes);
            type ? setBakeType(type) : setBakeType("All");
            searchTermRef.current = searchTerm;

        }
        getBakes();
    }, [searchParams])
    
    const handlePagination = () => {
        
    }

    const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
        switch (event.target.value) {
            //Most Popular
            case "a":
                bakes.sort((a, b) => a.rating - b.rating);
                break;
            //Price: Low to High    
            case "b":
                bakes.sort((a, b) => a.price - b.price);
                break;
            //Price: High to Low    
            case "c":
                bakes.sort((a, b) => b.price - a.price);
                break;
            //Name: A to Z  
            case "d":
                bakes.sort((a, b) => a.name.localeCompare(b.name));
                break;
            //Name: Z to A   
            case "e":
                bakes.sort((a, b) => b.name.localeCompare(a.name));
                break;
            //Discount 
            case "f":
                bakes.sort((a, b) => b.discount - a.discount);
                break;
            default:
                break;
        }
        setFilter(event.target.value);
    }

    return (
        <main>
            <div>
                <PageHeader title="Our Selections" description="Indulge in our wide array of delectable treats. From classic cakes to mouthwatering pastries,
                            we have something to satisfy every sweet tooth."/>
                <section className="py-10">
                    {bakes.length > 0 ? (
                        <div className="container mx-auto px-4 ">
                            <h1 className="text-center">{bakeType}</h1>
                            <div className="py-3">
                                <select onChange={handleFilter} defaultValue="a">
                                    <option value="a">Most Popular</option>
                                    <option value="b">Price (Low To High)</option>
                                    <option value="c">Price (High to Low)</option>
                                    <option value="d">Name (A To Z)</option>
                                    <option value="e">Name (Z To A)</option>
                                    <option value="f">Discount</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-12">
                                {bakes.map((bake: Bake) => (<BakeCard key={bake.id} bake={bake}/>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center">
                            <h1>No results for {searchTermRef.current}</h1>
                            <p>Try checking your spelling or use more general terms</p>
                        </div>
                    )}
                </section>
            </div>
            <div className="flex py-2">
                <Button className="m-auto">Next page</Button>
            </div>
        </main>
    );
}