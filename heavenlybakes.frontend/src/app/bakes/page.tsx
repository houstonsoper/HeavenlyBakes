"use client"

import {fetchBakes, fetchBakeTypeByName, fetchBakeTypes, fetchPopularBakes} from "@/services/bakeService";
import {RefObject, useEffect, useMemo, useRef, useState} from "react";
import Bake from "@/interfaces/bake";
import BakeCard from "../../components/bakeCard";
import {useSearchParams} from "next/navigation";
import PageHeader from "@/components/pageHeader";
import {Button} from "@/components/ui/button";
import {BakeType} from "@/interfaces/bakeType";

export default function Page() {
    const [bakes, setBakes] = useState<Bake[]>([]);
    const [bakesForNextPage, setBakesForNextPage] = useState<Bake[]>([]);
    const searchParams = useSearchParams();
    const [filter, setFilter] = useState("");
    const [page, setPage] = useState(1);
    const limit = 12;
    const [search, setSearch] = useState<string | null>(null);
    const [bakeType, setBakeType] = useState<BakeType | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    //Fetch the search and bake type params 
    useEffect(() => {
            const handleSearchParams = async () => {
                //Clear current state of search params
                setSearch(null);
                setBakeType(null);

                //If bake type param is included fetch the bake type and set it in state
                const bakeType: string | null = searchParams.get("type");
                if (bakeType) setBakeType(await fetchBakeTypeByName(bakeType))

                //If search param is included set it in state
                setSearch(searchParams.get("search"));
            }
            handleSearchParams();
        }, [searchParams]
    );

    //Fetch Bakes
    useEffect(() => {
        const getBakes = async () => {
            setIsLoading(true);
            
            const offset: number = (page - 1) * limit;
            const fetchedBakes: Bake[] = await fetchBakes({searchTerm: search ?? "", type: bakeType?.id ?? 0, limit, offset});
            
            if (fetchedBakes.length > 0) {
                setBakes(fetchedBakes);
                setIsLoading(false);
            }
        }
        getBakes();
    }, [search, bakeType])


    //Fetch bakes for next page
    useEffect(() => {
        const controller = new AbortController;
        const signal: AbortSignal = controller.signal;

        const fetchBakesForNextPage = async () => {
            const offset: number = page * limit;
            const fetchedBakes: Bake[] = await fetchBakes({
                searchTerm: search ?? "",
                type: bakeType?.id ?? 0,
                limit,
                offset
            }, signal);
            setBakesForNextPage(fetchedBakes);
        }
        fetchBakesForNextPage();
    }, [search, bakeType, page]);

    const handlePagination = () => {
        setBakes([...bakes, ...bakesForNextPage]);
        setPage(prevPage => prevPage + 1);
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
                    {!isLoading && (
                        bakes.length > 0 ? (
                            <div className="container mx-auto px-4 ">
                                <h1 className="text-center">{bakeType?.type ?? "All"}</h1>
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
                                <h1>No results for {search}</h1>
                                <p>Try checking your spelling or use more general terms</p>
                            </div>
                        ))}
                </section>
            </div>
            <div className="flex py-2">
                {bakesForNextPage.length > 0 && (
                    <Button onClick={handlePagination} className="m-auto">Next page</Button>
                )}
            </div>
        </main>
    );
}