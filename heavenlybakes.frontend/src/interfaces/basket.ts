import BasketItem from "@/interfaces/basketItem";

export default interface Basket{
    items: BasketItem[] | [];
    total: number;
}