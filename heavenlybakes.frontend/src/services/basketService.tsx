import BasketItem from "@/interfaces/basketItem";
import {createCookie, getCookie} from "@/services/cookieService";
import Basket from "@/interfaces/basket";

export function calculateBasketTotal(basketItems : BasketItem[]) : number {
    let total : number = 0;
    basketItems.forEach((item: BasketItem) => {
        total += item.price * item.quantity;
    });
    return total;
}
export function getExistingBasket() : Basket { 
    const existingBasketItems : BasketItem [] | [] = getCookie("basket") || [];
    
    //Calculate cost of all items in the basket
    const total : number = calculateBasketTotal(existingBasketItems);   
    
    console.log(existingBasketItems
        ? {items : existingBasketItems, total}
        : {items: [], total: 0 });
    
    return existingBasketItems
        ? {items : existingBasketItems, total}
        : {items: [], total: 0 };
}
export function addToBasket(basketItem : BasketItem){
    const existingBasket : Basket = getExistingBasket();
    
    //Check if the item already existing in the basket
    const itemExists : boolean = existingBasket.items.some(item => item.id === basketItem.id);
    
    //Increase quantity if item exists, or add a new item to the basket if it doesn't
    const updatedBasketItems : BasketItem[] =
        itemExists ?
            existingBasket.items.map(item => item.id === basketItem.id
                ? {...item, quantity: item.quantity + basketItem.quantity, totalPrice : item.totalPrice + basketItem.totalPrice}
                : item
            )
            : [...existingBasket.items, basketItem];
    
    //Sort the basket by id
    const sortedBasketItems : BasketItem[] = updatedBasketItems.sort((a, b) => a.id - b.id);
    
    createCookie("basket", sortedBasketItems);
}

export function removeFromBasket(basketItem : BasketItem){
    const existingBasket : Basket = getExistingBasket();
    
    //Remove item from basket if it exists
    const updatedBasketItems : BasketItem[] = existingBasket.items.filter(item => item.id !== basketItem.id);
    
    createCookie("basket", updatedBasketItems);
}