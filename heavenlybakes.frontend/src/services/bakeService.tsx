import Bake from "../interfaces/bake";
import BakeParams from "../interfaces/bakeParams";

const BASE_URL = 'https://localhost:44367';

export async function fetchBakes({searchTerm = "", limit = 0,  offset = 0} : BakeParams = {}) : Promise<Bake[]> {
    try{
        const URL = `${BASE_URL}/bakes?limit=${limit}&offset=${offset}`;
        const response = await fetch(URL);
        
        if(!response.ok){
            throw new Error("Unable to retrieve Bakes from API");
        }

        const bakes : Bake[] = await response.json();
        
        //Filter bakes by search term, if there isn't one filter by an empty string which will return all bakes.
        return bakes.filter(bake => bake.name.toLowerCase().includes((searchTerm || "").toLowerCase()));
    }
    catch(error : any){
        console.error(error.message);
        return [];
    }
}

export async function fetchPopularBakes(limit: number = 0) : Promise<Bake[]> {
    const bakes:Bake[] = await fetchBakes();
    
    //Sort bakes by rating 
    const sortedBakes = bakes.sort((a, b) => b.rating - a.rating);

    //Limit the number of bakes to return by the "limit" parameter if included
    return limit > 0 ? sortedBakes.slice(0, limit) : sortedBakes;
}

export async function fetchBakeById(bakeId : string) : Promise<Bake | null>{
    try{
        const url = `${BASE_URL}/bakes/${bakeId}`;
        const response = await fetch(url);
        
        if(!response.ok){
            throw new Error("Unable to retrieve Bake from API");
        }
        
        return await response.json();
    } catch(error : any){
        console.error(error.message);
        return Promise.resolve(null);
    }
}