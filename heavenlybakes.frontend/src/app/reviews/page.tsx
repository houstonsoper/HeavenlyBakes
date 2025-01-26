"use client"

import Review from "@/interfaces/review";
import {fetchReviews} from "@/services/reviewService";
import {useEffect, useState} from "react";
import {ReadonlyURLSearchParams, useSearchParams} from "next/navigation";
import Bake from "@/interfaces/bake";
import {fetchBakeById} from "@/services/bakeService";
import ReviewWithBake from "@/interfaces/reviewWithBake";
import ReviewForm from "@/components/reviewForm";
import {useUser} from "@/contexts/userContext";

export default function Page (){
    const [bakesForReview, setBakesForReview] = useState<(ReviewWithBake)[]>([]);
    const searchParams : ReadonlyURLSearchParams = useSearchParams();
    const [updatePage, setUpdatePage] = useState<boolean>(false);
    const {user} = useUser();
    
    useEffect(() => {
        const controller = new AbortController();
        const signal : AbortSignal = controller.signal;
        
        //Get existing reviews for the customer based on the item(s) they have selected to review
        //This is to prevent the user from reviewing the same item twice
        const getCustomersReviews = async() => {
            if(user) {
                //Get bakes from search param
                const bakeParam : string | null = searchParams.get("items");
                const bakeIds : number[] = bakeParam ? JSON.parse(decodeURIComponent(bakeParam)) : [];
                
                //Create an array of promises to fetch reviews and bakes for each bakeId
                const bakesForReviewArray : (ReviewWithBake | null)[]  = await Promise.all (
                    bakeIds.map(async bakeId => {
                        const review : Review = (await fetchReviews({ bakeId, userId: user.userId }, signal))[0] ?? null;
                        const bake : Bake | null = await fetchBakeById(bakeId, signal);
                        
                        //If the bake exists, return the bake and existing reviews (if exists), otherwise return null
                        if (bake !== null){
                            return { review, bake }
                        }
                        return null;
                    })
                );
                //Update the state, filtering out any null values
                //and sorting the array so items without a review are at the top.
                setBakesForReview(
                    bakesForReviewArray
                        .filter(bfr => bfr !== null)
                        .sort((a : ReviewWithBake, b : ReviewWithBake) : 0 | 1 | -1 => {
                            if (a.review !== null && b.review === null) return 1;
                            if (a.review === null && b.review !== null) return -1;
                            return 0;
                        })
                );
            }
        }
        getCustomersReviews();
        setUpdatePage(false);
        
        return () => controller.abort();
    }, [searchParams, user, updatePage]);
    
    return (
        <div className="container m-auto">
        {bakesForReview.length > 0 ? (
            bakesForReview.map((bakeForReview : ReviewWithBake) => (
                    <ReviewForm bakeForReview={bakeForReview} updatePageAction={setUpdatePage} key={bakeForReview.bake.id} />
            ))
            ) : (
                []
            )}
        </div>
    )
}



