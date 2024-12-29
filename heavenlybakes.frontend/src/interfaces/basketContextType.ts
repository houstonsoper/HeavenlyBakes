import BasketItem from "@/interfaces/basketItem";
import Basket from "@/interfaces/basket";

export interface BasketContextType {
    basket: Basket,
    total: number,
    basketCount: number,
    addToBasket: (item: BasketItem) => void,
    removeFromBasket: (item: BasketItem) => void,
    increaseQuantity: (item: BasketItem) => void,
    decreaseQuantity: (item: BasketItem) => void,
    updateBasket: () => void
}