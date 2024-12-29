"use client";

import Image from "next/image";
import Link from "next/link";
import {useState} from "react";
import {useRouter} from "next/navigation";

export default function Navbar() {

    return (
        <nav className="bg-gray-200 shadow shadow-gray-300 w-100 px-8 md:px-auto">
            <div
                className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap text-center">

                <div className="text-indigo-500 md:order-1">
                    Heavenly Bakes
                </div>
                
                <div className="order-2">
                    <input placeholder={"Search"}/>
                    <button>Search</button>
                </div>

                <div className="text-gray-500 order-3 w-full md:w-auto md:order-2">
                    <ul className="flex font-semibold justify-between">
                        <Link className="md:px-4 md:py-2 text-indigo-500" href="/">HOME </Link> 
                        <Link className="md:px-4 md:py-2 hover:text-indigo-400" href="/bakes">VIEW PRODUCTS</Link>
                    </ul>
                </div>
                <div className="order-2 md:order-3">
                    <button
                        className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2">
                        <Link href="/basket">
                            <span className="material-symbols-outlined">
                                shopping_bag
                            </span>
                        </Link>
                    </button>
                </div>
            </div>
        </nav>
    );
}
