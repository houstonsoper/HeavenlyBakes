import BasketItem from "@/interfaces/basketItem";
import {createCookie, getCookie} from "@/services/cookieService";
import Basket from "@/interfaces/basket";
import {deleteCookie} from "undici-types";

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

export function getBasketCount() : number {
    const basket : Basket = getExistingBasket();
    
    //Calculate the quantity of items in the basket
    let count : number = 0;
    basket.items.forEach((item : BasketItem) => {
        count += item.quantity 
    })
    
    return count;
}

export function clearBasket (){
    const existingBasket : Basket = getExistingBasket();
    
    if(!existingBasket){
        console.log("No basket found!");
        return;
    }
    
    //Delete cookie
    document.cookie = "basket=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}