"use client";

import Image from "next/image";
import Link from "next/link";
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import SearchBar from "@/components/searchBar";
import BasketCount from "@/components/basketCount";
import {useUser} from "@auth0/nextjs-auth0/client";

export default function Navbar() {
    const { user } = useUser();
    
    console.log(user);
    
    return (
        <nav className="bg-gray-200 shadow shadow-gray-300 w-100 px-8 md:px-auto">
            <div
                className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap text-center">

                <div className="text-orange-500 md:order-1">
                    Heavenly Bakes
                </div>
                
                <div className="order-2">
                    <SearchBar/>
                </div>
                
                <div className="text-gray-500 order-3 w-full md:w-auto md:order-2">
                    <ul className="flex font-semibold justify-between">
                        <Link className="md:px-4 md:py-2 hover:text-orange-500" href="/">HOME </Link> 
                        <Link className="md:px-4 md:py-2 hover:text-orange-500" href="/bakes">VIEW PRODUCTS</Link>
                    </ul>
                </div>
                <div className="flex order-2 md:order-3">
                    <div className="flex px-2">
                        {!user ? (
                            <Link href="/api/auth/login">Login</Link>
                        ) : <Link href="/api/auth/logout">Logout</Link>}
                    </div>
                    <BasketCount/>
                </div>
            </div>
        </nav>
    );
}
