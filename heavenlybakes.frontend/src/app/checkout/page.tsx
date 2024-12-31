"use client"

import {useBasket} from "@/contexts/basketContext";
import {useUser} from "@auth0/nextjs-auth0/client";
import {useRouter} from "next/navigation";
import React from "react";

export default function Page () {
    const options = { clientSecret: process.env.NEXT_PUBLIC_STRIPE_SECRET }
    const { basket } = useBasket();
    const { user } = useUser();
    const router = useRouter();
    
    //If user is not logged in redirect them to the login page
    if(!user) {
        const returnTo : string = encodeURIComponent(window.location.href);
        router.push("/api/auth/login")//?returnTo=" + returnTo);
        return null;
    }
    
    return (
        <div>
            <div className="container m-auto">
                    <form className="border border-black rounded my-6 p-4 m-auto w-1/2 justify-center flex-col">
                        
                    <label htmlFor="Street">Street</label>
                    <input className="block mb-3" id="street" type="text" placeholder="Street" required/>
            
                    <label htmlFor="Address">City</label>
                    <input className="block mb-3" id="city" type="text" placeholder="City" required/>
            
                    <label htmlFor="Postcode">Postcode</label>
                    <input className="block mb-3" id="postcode" type="text" placeholder="Postcode" required/>
            
                    <label htmlFor="Country">Country</label>
                    <input className="block mb-3" id="country" type="text" placeholder="Country" required/>
            
                    <label htmlFor="Payment Method">Payment Method</label>
                    <input className="block mb-3" id="payment-method" type="text" placeholder="Payment Method" required/>
                </form>
                <div className="text-center">Total: {basket.total.toFixed(2)}</div>
            </div>
        </div>
    )
}