import {PaymentMethod} from "@/interfaces/paymentMethod";

const BASE_URL = "https://localhost:44367";

export async function fetchPaymentMethods(signal?: AbortSignal) : Promise<PaymentMethod[]> {
    try{
        const url : string = `${BASE_URL}/PaymentMethods`;
        const response : Response = await fetch(url, {signal});
        
        if(!response.ok){
            throw new Error("Unable to retrieve payment methods from API");
        }
        
        const data : PaymentMethod[] = await response.json();
        
        //Return payment methods, excluding "Not Specified"
        return data.filter(paymentMethod  => paymentMethod.id != 1);
    }
    catch(error){
        if (error instanceof DOMException && error.name === "AbortError") {
            console.error("Fetch request aborted");
        } else if (error instanceof Error) {
            console.error(error.message);
        }
        return [];
    }
}