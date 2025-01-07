"use client"

import {fetchBakes, fetchPopularBakes} from "@/services/bakeService";
import {useEffect, useState} from "react";
import Bake from "@/interfaces/bake";
import BakeCard from "../../components/bakeCard";
import {useSearchParams} from "next/navigation";
import PageHeader from "@/components/pageHeader";

export default function Page() {
    const [bakes, setBakes] = useState<Bake[]>([]);
    const searchParams = useSearchParams();
    const [filter, setFilter] = useState("");
    
    console.log(searchParams.get("type"));
    
    //Fetch Bakes
    useEffect(() => {
        const getBakes = async () => {

            //Get the searchParam for search term and type
            const searchTerm: string | null = searchParams.get("search");
            const type: string | null = searchParams.get("type");
            
            //Fetch bakes by search term/type if included, else fetch all
            const fetchedBakes: Bake[] = await fetchBakes({
                searchTerm: searchTerm || undefined, 
                type: type || undefined
            });
            setBakes(fetchedBakes);
        }
        getBakes();
    }, [searchParams])
    
    //Filter Bakes by BakeType if there is a search param
    
    
    const handleFilter = (event : React.ChangeEvent<HTMLSelectElement>) => {
            switch(event.target.value) {
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
        <div>
            <PageHeader title="Our Selections" description="Indulge in our wide array of delectable treats. From classic cakes to mouthwatering pastries,
                        we have something to satisfy every sweet tooth." />
            
            <section className="py-10">
                <div className="container mx-auto px-4 ">
                    <div>
                        <select onChange={handleFilter} defaultValue="a">
                            <option value="a">Most Popular</option>
                            <option value="b">Price (Low To High)</option>
                            <option value="c">Price (High to Low)</option>
                            <option value="d">Name (A To Z) </option>
                            <option value="e">Name (Z To A) </option>
                            <option value="f">Discount</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-12">
                        {bakes.map((bake: Bake) => (<BakeCard key={bake.id} bake={bake}/>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}