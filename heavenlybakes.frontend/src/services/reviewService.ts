import Review from "@/interfaces/review";
const BASE_URL : string =  `https://localhost:44367`;
    
export async function fetchBakeReviews(bakeId : number, signal : AbortSignal) : Promise<Review[]>  {
    try{
        let url : string = `${BASE_URL}/reviews?bakeId=${bakeId}`;
        
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

export async function fetchCustomerReviews(customerId : string, signal : AbortSignal) : Promise<Review[]>  {
    try{
        let url : string = `${BASE_URL}/reviews?customerId=${customerId}`;

        const response : Response = await fetch(url, {signal});

        if(!response.ok){
            throw new Error("Unable to retrieve review from API");
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