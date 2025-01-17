"use client"

import Review from "@/interfaces/review";
import {fetchReviews} from "@/services/reviewService";
import {useEffect, useState} from "react";
import {useUser} from "@auth0/nextjs-auth0/client";
import {ReadonlyURLSearchParams, useSearchParams} from "next/navigation";

export default function Page (){
    const [existingReviews, setExistingReviews] = useState<Review[]>([]);
    const {user} = useUser();
    const searchParams : ReadonlyURLSearchParams = useSearchParams();
    
    useEffect(() => {
        const controller = new AbortController();
        const signal : AbortSignal = controller.signal;
        
        //Get existing reviews for the customer based on the item(s) they have selected to review
        //This is to prevent the user from reviewing the same item twice
        const getExistingCustomersReviews = async() => {
            if(user && user.sub) {
                //Get bakes from search param
                const itemParam : string | null = searchParams.get("items");
                const bakeIds : number[] = itemParam ? JSON.parse(decodeURIComponent(itemParam)) : [];
                
                const existingReviewsArray : Review[] = [];
                
                //Iterate through BakesIds and fetch existing reviews for the bake and customer
                for(const bakeId in bakeIds){
                    const numericBakeId : number = Number(bakeId);
                    const review : Review[] = await fetchReviews({bakeId : numericBakeId, customerId : user.sub}, signal)
                    //If customer already has a review for the bake then add it to the existingReviewsArray
                    if(review) {
                        existingReviewsArray.push(review[0]);
                    }
                }
                console.log(existingReviewsArray);
                setExistingReviews(existingReviewsArray);
            }
        }
        
        return () => controller.abort();
    }, [searchParams]);
    
    
    return (
        <h1>Hello</h1>
    )
}



