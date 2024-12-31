import {PaymentMethod} from "@stripe/stripe-js";

const BASE_URL = "https://localhost:44367";

export async function getPaymentMethods() : Promise<PaymentMethod[]> {
    try{
        const url : string = `${BASE_URL}/PaymentMethods`;
        const response : Response = await fetch(url);
        
        if(!response.ok){
            throw new Error("Unable to retrieve payment methods from API");
        }
        
        return await response.json();
    }
    catch(error){
        console.error(error);
        return [];
    }
}