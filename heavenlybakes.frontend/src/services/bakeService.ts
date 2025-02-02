import Bake from "../interfaces/bake";
import BakeParams from "../interfaces/bakeParams";
import {BakeType} from "@/interfaces/bakeType";

const BASE_URL = 'https://localhost:44367';

export async function fetchBakes({searchTerm = "", type ="", limit = 0,  offset = 0} : BakeParams, signal? : AbortSignal) : Promise<Bake[]> {
    try{
        debugger;
        const url : string = `${BASE_URL}/bakes?limit=${limit}&offset=${offset}&type=${type}`;
        const response : Response = await fetch(url, {signal});
        
        if(!response.ok){
            throw new Error("Unable to retrieve Bakes from API");
        }

        const bakes : Bake[] = await response.json();
        
        return bakes
            .filter(bake => bake.inProduction && bake.stock > 0) //Filter by inProduction and in stock
            .filter(bake => bake.name.toLowerCase().includes((searchTerm || "").toLowerCase())); //Filter by search term
    }
    catch(error ){
        if (error instanceof DOMException && error.message === "AbortError") {
            console.log("Fetch request aborted");
        }
        else if (error instanceof Error && error.message !== "AbortError"){
            console.error(error.message);
        }
        return [];
    }
}

export async function fetchPopularBakes(limit: number = 0, signal? : AbortSignal) : Promise<Bake[]> {
    const bakes:Bake[] = await fetchBakes({}, signal);
    
    //Sort bakes by rating 
    const sortedBakes : Bake[] = bakes.sort((a, b) => b.rating - a.rating);

    //Limit the number of bakes to return by the "limit" parameter if included
    return limit > 0 ? sortedBakes.slice(0, limit) : sortedBakes;
}

export async function fetchBakeById(bakeId : number, signal? : AbortSignal) : Promise<Bake | null>{
    try{
        const url = `${BASE_URL}/bakes/${bakeId}`;
        const response : Response = await fetch(url, {signal});
        
        if(!response.ok){
            throw new Error("Unable to retrieve Bake from API");
        }
        return await response.json();
    } catch(error){
        if(error instanceof DOMException){
            console.log("Fetch request aborted");
        } else if (error instanceof Error) {
            console.error(error.message);
        }
        return null;
    }
}

export async function fetchBakeTypes(signal : AbortSignal) : Promise <BakeType[] | []> {
    try {
        const url = `${BASE_URL}/bakes/types`;
        const response: Response = await fetch(url, {signal});

        if (!response.ok) {
            throw new Error("Unable to retrieve Bake types");
        }
        return await response.json();
    }
    catch(error){
        if(error instanceof DOMException && error.message === "AbortError") {
            console.log ("Fetch request aborted");
        } else if (error instanceof Error){
            console.error(error.message);
        }
        return [];
    }
}