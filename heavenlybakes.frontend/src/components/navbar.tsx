"use client";

import Image from "next/image";
import Link from "next/link";
import {useState} from "react";
import {useRouter} from "next/navigation";
import SearchBar from "@/components/searchBar";
import BasketCount from "@/components/basketCount";

export default function Navbar() {
    
    return (
        <nav className="bg-gray-200 shadow shadow-gray-300 w-100 px-8 md:px-auto">
            <div
                className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap text-center">

                <div className="text-indigo-500 md:order-1">
                    Heavenly Bakes
                </div>
                
                <div className="order-2">
                    <SearchBar/>
                </div>
                
                <div className="text-gray-500 order-3 w-full md:w-auto md:order-2">
                    <ul className="flex font-semibold justify-between">
                        <Link className="md:px-4 md:py-2 text-indigo-500" href="/">HOME </Link> 
                        <Link className="md:px-4 md:py-2 hover:text-indigo-400" href="/bakes">VIEW PRODUCTS</Link>
                    </ul>
                </div>
                <div className="order-2 md:order-3">
                    <BasketCount/>
                </div>
            </div>
        </nav>
    );
}
