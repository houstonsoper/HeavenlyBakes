"use client"

import Review from "@/interfaces/review";
import {fetchReviews} from "@/services/reviewService";
import {useEffect, useState} from "react";
import {useUser} from "@auth0/nextjs-auth0/client";
import {ReadonlyURLSearchParams, useSearchParams} from "next/navigation";
import Bake from "@/interfaces/bake";
import {fetchBakeById} from "@/services/bakeService";
import ReviewWithBake from "@/interfaces/reviewWithBake";
import ReviewForm from "@/components/reviewForm";

export default function Page (){
    const [bakesForReview, setBakesForReview] = useState<(ReviewWithBake)[]>([]);
    const {user} = useUser();
    const searchParams : ReadonlyURLSearchParams = useSearchParams();
    
    useEffect(() => {
        const controller = new AbortController();
        const signal : AbortSignal = controller.signal;
        
        //Get existing reviews for the customer based on the item(s) they have selected to review
        //This is to prevent the user from reviewing the same item twice
        const getCustomersReviews = async() => {
            if(user?.sub) {
                //Get bakes from search param
                const bakeParam : string | null = searchParams.get("items");
                const bakeIds : number[] = bakeParam ? JSON.parse(decodeURIComponent(bakeParam)) : [];
                
                //Create an array of promises to fetch reviews and bakes for each bakeId
                const bakesForReviewArray : (ReviewWithBake | null)[]  = await Promise.all (
                    bakeIds.map(async bakeId => {
                        const review : Review = (await fetchReviews({ bakeId, customerId: user.sub ?? undefined }, signal))[0] ?? null;
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
        
        return () => controller.abort();
    }, [searchParams, user]);
    
    return (
        <div className="container m-auto">
        {bakesForReview.length > 0 ? (
            bakesForReview.map((bakeForReview : ReviewWithBake) => (
                    <ReviewForm bakeForReview={bakeForReview} key={bakeForReview.bake.id} />
            ))
            ) : (
                []
            )}
        </div>
    )
}



