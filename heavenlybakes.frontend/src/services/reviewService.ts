import Review from "@/interfaces/review";
const BASE_URL : string =  `https://localhost:44367`;

interface ReviewParams {
    bakeId?: number;
    customerId?: string;
}
export async function fetchReviews({bakeId, customerId} : ReviewParams, signal : AbortSignal) : Promise<Review[]>  {
    try{
        let url : string = `${BASE_URL}/reviews`;
        
        //Set url based on the params supplied
        if(bakeId && customerId) {
            url += `?bakeId=${bakeId}&customerId=${customerId}`;
        } else if (bakeId) {
            url += `?bakeId=${bakeId}`;
        } else if (customerId){
            url += `?customerId=${customerId}`;
        }
        
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

export async function postReview (review : Review) {
    try {
        const url = `${BASE_URL}/Review`;
        
        const response : Response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(review),
            headers: {'Content-Type': 'application/json'}
        });
        
        if (!response.ok){
            throw new Error("Unable to post review");
        }
    } catch(error){
        if (error instanceof Error){
            console.error(error.message);
        }
    }
}

export async function updateReview (review : Review) {
    try {
        const updatedReview = {
            title: review.title,
            feedback: review.feedback,
            rating: review.rating,
        }
        
        const url = `${BASE_URL}/Review/${review.customerId}/${review.bakeId}`;
        const response: Response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(updatedReview),
            headers: {'Content-Type': 'application/json'}
        })

        if (!response.ok) {
            throw new Error("Unable to update review");
        }
    } catch (error){
        if (error instanceof Error){
            console.error(error.message);
        }
    }
}