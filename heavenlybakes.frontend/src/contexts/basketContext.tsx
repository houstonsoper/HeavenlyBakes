"use client"

import {ReactNode, useContext, useEffect, useState} from "react";
import {BasketContextType} from "@/interfaces/basketContextType";
import {createContext} from "react";
import Basket from "@/interfaces/basket";
import {getExistingBasket, getBasketCount, addToBasket, removeFromBasket} from "@/services/basketService";
import BasketItem from "@/interfaces/basketItem";

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export const BasketProvider = ({ children } : {children : ReactNode}) => {
    const [basket, setBasket] = useState<Basket>({items:[], total: 0});
    const [total, setTotal] = useState<number>(0);
    const [basketCount, setBasketCount] = useState<number>(0);
    const [basketUpdated, setBasketUpdated] = useState<boolean>(false);
    
    //Get basket on mount, or if there is an update.
    useEffect(() => {
        const existingBasket : Basket = getExistingBasket();
        setBasket(existingBasket);
        setTotal(existingBasket.total);
        setBasketCount(getBasketCount());
    }, [basketUpdated]);
    
    const addToBasketHandler = (item : BasketItem) => {
        addToBasket(item);
        updateBasket();
    };
    
    const removeFromBasketHandler = (item: BasketItem) => {
        removeFromBasket(item);
        updateBasket();
    };

    const increaseQuantity = (item: BasketItem) => {
        //Increase quantity and update price
        item.quantity += 1;
        item.totalPrice = item.price * item.quantity;
        
        //Refresh basket
        removeFromBasket(item); 
        addToBasketHandler(item);
    };
    
    const decreaseQuantity = (item: BasketItem) => {
        //If quantity is below 1 then remove the item from the basket, otherwise decrease quantity by 1
        if(item.quantity <= 1) {
            removeFromBasketHandler(item);
        } else {
            //Decrease quantity and update price
            item.quantity -= 1;
            item.totalPrice = item.price * item.quantity;
            
            //Refresh basket
            removeFromBasket(item); 
            addToBasketHandler(item);
        }
    };
    
    const updateBasket = () => {
        setBasketUpdated(prev => !prev);
    };
    
    return(
        <BasketContext.Provider
            value={{
                basket,
                total,
                basketCount,
                addToBasket : addToBasketHandler,
                removeFromBasket : removeFromBasketHandler,
                increaseQuantity,
                decreaseQuantity,
                updateBasket,
            }}
            >
            {children}
        </BasketContext.Provider>
    );
};

export const useBasket = (): BasketContextType => {
    const context : BasketContextType | undefined = useContext(BasketContext);
    
    if (!context) {
        throw new Error("useBasket must be used within a Basket Provider");
    }
    return context;
}
