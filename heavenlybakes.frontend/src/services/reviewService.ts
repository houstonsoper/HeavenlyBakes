import ReviewParams from "@/interfaces/reviewParams";
const BASE_URL : string =  `https://localhost:44367`;
    
export async function fetchReviews({bakeId, customerId} : ReviewParams, signal : AbortSignal) {
    try{
        const url = `${BASE_URL}/reviews/?${bakeId}&customerId=${customerId}`;
        const response : Response = await fetch(url);
        
        if(!response.ok){
            throw new Error("Unable to retrieve reviews from API");
        }
        
        return await response.json();
        
    } catch (error){
        if (error instanceof DOMException && error.name === "AbortError") {
            console.log ("Fetch request aborted");
        }
        else if (error instanceof Error){
            console.error(error.message);
        }
    }
}