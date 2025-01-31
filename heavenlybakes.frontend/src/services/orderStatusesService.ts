import OrderStatus from "@/interfaces/orderStatus";

const BASE_URL : string = "https://localhost:44367"
export async function fetchOrderStatuses(signal? : AbortSignal) : Promise<OrderStatus[] | []>{
    try {
        const url: string = BASE_URL + "/OrderStatuses";
        const response: Response = await fetch(url, {signal})

        if (!response.ok) {
            throw new Error("Failed to fetch order statuses from API")
        }
        
        return await response.json();
    } catch (error) {
        throw new Error("Failed to fetch order statuses from API");
    }
    return [];
}