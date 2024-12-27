import {Bake} from "../Interfaces/bake";

const BASE_URL = 'https://localhost:44367';

export async function fetchBakes() : Promise<Bake[]> {
    try{
        const URL = `${BASE_URL}/bakes`;
        const response = await fetch(URL);
        
        if(!response.ok){
            throw new Error("Unable to retrieve Bakes from API");
        }
        
        return await response.json();
    }
    catch(error : any){
        console.error(error.message);
        return [];
    }
}