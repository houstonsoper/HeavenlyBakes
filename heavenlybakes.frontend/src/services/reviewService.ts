﻿import Review from "@/interfaces/review";
import ReviewParams from "@/interfaces/reviewParams";
const BASE_URL : string =  `https://localhost:44367`;
    
export async function fetchReviews({bakeId, customerId} : ReviewParams, signal : AbortSignal) : Promise<Review[]>  {
    try{
        let url : string = `${BASE_URL}/reviews`;
        
        //Add query parameters to url
        if (bakeId) url += `?bakeId=${bakeId}`;
        if (customerId) url += `&customerId=${customerId}`;
        
        const response : Response = await fetch(url, {signal});
        
        if(!response.ok){
            throw new Error("Unable to retrieve reviews from API");
        }
        
        const reviews : Review[] =  await response.json();
        
        //Formatting the date 
        for (const review of reviews){
            review.formattedDate = new Date(review.createDateTime).toDateString();
        }
        
        return reviews;
        
    } catch (error){
        if (error instanceof DOMException && error.name === "AbortError") {
            console.log ("Fetch request aborted");
        }
        else if (error instanceof Error){
            console.error(error.message);
        }
        return [];
    }
}

export async function fetchRating(bakeId : number, signal : AbortSignal) : Promise<number>  {
    try {
        const url: string = `${BASE_URL}/rating/${bakeId}`;
        const response: Response = await fetch(url, {signal})

        if (!response.ok) {
            throw new Error("Unable to retrieve reviews from API");
        }
        
        return await response.json();
    }
    catch(error){
        if (error instanceof DOMException && error.name === "AbortError") {
            console.log(error.message);
        } else if (error instanceof Error){
            console.error(error.message);
        }
        return 0;
    }
}