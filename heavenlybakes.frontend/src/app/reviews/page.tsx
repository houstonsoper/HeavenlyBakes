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
    const [bakesForReview, setBakesForReview] = useState<ReviewWithBake[]>([]);
    const {user} = useUser();
    const searchParams : ReadonlyURLSearchParams = useSearchParams();
    
    useEffect(() => {
        const controller = new AbortController();
        const signal : AbortSignal = controller.signal;
        
        //Get existing reviews for the customer based on the item(s) they have selected to review
        //This is to prevent the user from reviewing the same item twice
        const getCustomersReviews = async() => {
            if(user && user.sub) {
                //Get bakes from search param
                const itemParam : string | null = searchParams.get("items");
                const bakeIds : number[] = itemParam ? JSON.parse(decodeURIComponent(itemParam)) : [];
                
                const bakesForReviewArray : ReviewWithBake[] = [];
                
                //Iterate through BakesIds and fetch reviews for the bake and customer
                for(const bakeId of bakeIds){
                    const review : Review = (await fetchReviews({bakeId, customerId : user.sub}, signal))[0] ?? [];
                    
                    //Fetch bake details 
                    const bake : Bake | null = await fetchBakeById(bakeId, signal)
                    if(bake){
                        bakesForReviewArray.push({ review, bake} );
                    }
                }
                console.log("reviews", bakesForReviewArray);
                setBakesForReview(bakesForReviewArray);
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



