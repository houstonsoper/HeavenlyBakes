"use client"

import Review from "@/interfaces/review";
import {fetchReviews} from "@/services/reviewService";
import {useEffect, useState} from "react";
import {useUser} from "@auth0/nextjs-auth0/client";
import {ReadonlyURLSearchParams, useSearchParams} from "next/navigation";
import Bake from "@/interfaces/bake";
import {fetchBakeById} from "@/services/bakeService";
import ReviewWithBake from "@/interfaces/reviewWithBake";

export default function Page (){
    const [existingReviews, setExistingReviews] = useState<ReviewWithBake[]>([]);
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
                
                const existingReviewsArray : ReviewWithBake[] = [];
                const bakesForReviewArray : Bake[] = [];
                
                //Iterate through BakesIds and fetch existing reviews for the bake and customer
                for(const bakeId of bakeIds){
                    const review : Review = (await fetchReviews({bakeId, customerId : user.sub}, signal))[0];
                    
                    //If customer already has a review for the bake then add it to the existingReviewsArray
                    if(review) {
                        const bake : Bake | null = await fetchBakeById(review.bakeId, signal)
                        if(bake){
                            existingReviewsArray.push({ bake, review} );
                        }
                    }
                    //Else get the details of the bake they haven't done a review for
                    else {
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
    }, [searchParams, user]);
    
    
    return (
        <h1>Hello</h1>
    )
}



