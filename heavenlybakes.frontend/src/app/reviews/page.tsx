"use client"

import Review from "@/interfaces/review";
import {fetchReviews} from "@/services/reviewService";
import {useEffect, useState} from "react";
import {useUser} from "@auth0/nextjs-auth0/client";
import {ReadonlyURLSearchParams, useSearchParams} from "next/navigation";
import Bake from "@/interfaces/bake";
import {fetchBakeById} from "@/services/bakeService";

export default function Page (){
    const [existingReviews, setExistingReviews] = useState<Review[]>([]);
    const [bakesForReview, setBakesForReview] = useState<Bake[]>([]);
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
                
                const existingReviewsArray : Review[] = [];
                const bakesForReviewArray : Bake[] = [];
                
                //Iterate through BakesIds and fetch existing reviews for the bake and customer
                for(const bakeId of bakeIds){
                    const review : Review[] = await fetchReviews({bakeId, customerId : user.sub}, signal)
                    //If customer already has a review for the bake then add it to the existingReviewsArray
                    if(review.length > 0) {
                        existingReviewsArray.push(review[0]);
                    } else {
                        const bake : Bake | null = await fetchBakeById(bakeId, signal);
                        if (bake) {
                            bakesForReviewArray.push(bake);
                        }
                    }
                }
                console.log("existing reviews", existingReviewsArray);
                console.log("new reviews", bakesForReviewArray);
                setExistingReviews(existingReviewsArray);
            }
        }
        getCustomersReviews();
        
        return () => controller.abort();
    }, [searchParams]);
    
    
    return (
        <h1>Hello</h1>
    )
}



