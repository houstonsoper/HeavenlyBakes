"use client"

import {fetchBakes, fetchBakeTypeByName, fetchBakeTypes, fetchPopularBakes} from "@/services/bakeService";
import {ChangeEvent, RefObject, useEffect, useMemo, useRef, useState} from "react";
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
    const [page, setPage] = useState(1);
    const limit = 12;
    const [search, setSearch] = useState<string | null>(null);
    const [bakeType, setBakeType] = useState<BakeType | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [orderBy, setOrderBy] = useState<string>("");

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
            const fetchedBakes: Bake[] = await fetchBakes({searchTerm: search ?? "", type: bakeType?.id ?? 0, limit, offset, orderBy});
            
            if (fetchedBakes.length > 0) {
                setBakes(fetchedBakes);
                setIsLoading(false);
            }
        }
        getBakes();
    }, [search, bakeType, orderBy])


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
                offset,
                orderBy,
            }, signal);
            setBakesForNextPage(fetchedBakes);
        }
        fetchBakesForNextPage();
    }, [search, bakeType, page, orderBy]);

    const handlePagination = () => {
        setBakes([...bakes, ...bakesForNextPage]);
        setPage(prevPage => prevPage + 1);
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
                                    <select onChange={(e : ChangeEvent<HTMLSelectElement>) => setOrderBy(e.target.value)} value={orderBy}>
                                        <option value="">Most Popular</option>
                                        <option value="priceAsc">Price (Low To High)</option>
                                        <option value="priceDesc">Price (High to Low)</option>
                                        <option value="nameAsc">Name (A To Z)</option>
                                        <option value="nameDesc">Name (Z To A)</option>
                                        <option value="discountDesc">Discount</option>
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