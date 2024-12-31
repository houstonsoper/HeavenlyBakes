"use client"

import {useBasket} from "@/contexts/basketContext";
import {useUser} from "@auth0/nextjs-auth0/client";
import {useRouter} from "next/navigation";
import React, {useEffect, useRef, useState} from "react";
import {fetchPaymentMethods} from "@/services/paymentService";
import {PaymentMethod} from "@/interfaces/paymentMethod";
import {OrderForm} from "@/interfaces/orderForm";
import {postOrder, postOrderItems} from "@/services/orderService";
import {Order} from "@/interfaces/order";
import {clearBasket, getExistingBasket} from "@/services/basketService";
import BasketItem from "@/interfaces/basketItem";
import {OrderItem} from "@/interfaces/orderItem";

export default function Page () {
    const { basket } = useBasket();
    const { user } = useUser();
    const router = useRouter();
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
    const formRef = useRef<HTMLFormElement>(null);
    
    //Fetch payment methods from API on mount
    useEffect(() => {
        const controller = new AbortController();
        const signal : AbortSignal = controller.signal;
        
        const getPaymentMethods = async () => {
            const data : PaymentMethod[] = await fetchPaymentMethods(signal);
            setPaymentMethods(data);
            }
        getPaymentMethods();
        
        //Cleanup function to abort fetch when component unmounts
        return () => controller.abort();
    }, []);
    
    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!formRef.current) return;
        
        //Capture the form data
        const formData = new FormData(formRef.current);
        
        //Covert data to an object (User must be logged in)
        if(user && user.sub) {
            const data: OrderForm = {
                customerId: user.sub,
                shippingAddress: formData.get("street") as string,
                shippingCity: formData.get("city") as string,
                shippingCountry: formData.get("country") as string,
                shippingPostalCode: formData.get("postcode") as string,
                paymentMethodId: parseInt(formData.get("paymentMethod") as string),
            };
            //Post order data to API
            const order : Order | null = await postOrder(data);
            if(!order) return <p>Unable to process order, please try again</p>
            
            //Post order items to API
            const basketItems : BasketItem[] = basket.items;
            
            let orderItems : OrderItem[] = [];
            basketItems.forEach(item => {
                const orderItem : OrderItem = {
                    orderId: order.orderId,
                    customerId: order.customer_id || data.customerId,
                    bakeId: item.id,
                    quantity: item.quantity,
                }
                orderItems.push(orderItem);
            })
            await postOrderItems(orderItems);
            
            //Clear basket and redirect the user to the order completion page
            clearBasket();
            router.push(`/order?orderId=${order.orderId}`);
        }
        else{
            return <p>Must be logged in to place an order</p>
        }
    }
    
    return (
        <div>
            <div className="container m-auto">
                <form 
                    ref={formRef}
                    onSubmit={handleFormSubmit}
                    className="border border-black rounded my-6 p-4 m-auto w-1/2 justify-center flex-col">

                    <label htmlFor="Street">Street</label>
                    <input className="block mb-3" name="street" type="text" placeholder="Street" required/>

                    <label htmlFor="Address">City</label>
                    <input className="block mb-3"name="city" type="text" placeholder="City" required/>

                    <label htmlFor="Postcode">Postcode</label>
                    <input className="block mb-3" name="postcode" type="text" placeholder="Postcode" required/>

                    <label htmlFor="Country">Country</label>
                    <input className="block mb-3" name="country" type="text" placeholder="Country" required/>

                    <label htmlFor="Payment Method">Payment Method</label>

                    <select className="block mb-3" name="paymentMethod" required>
                        {/*Map payment options*/}
                        {paymentMethods.map((method: PaymentMethod) => (
                            <option key={method.id} value={method.id}>{method.method}</option>
                        ))}
                    </select>
                    <div className="text-center">Total: {basket.total.toFixed(2)}</div>

                    <div className="flex m-auto w-1/2 justify-center">
                        <button className="bg-blue-400 text-white p-2 w-1/2 ">Checkout</button>
                    </div>
                </form>
            </div>
        </div>
    )
}