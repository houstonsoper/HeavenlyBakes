﻿"use client";

import Image from "next/image";
import Link from "next/link";
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import SearchBar from "@/components/searchBar";
import BasketCount from "@/components/basketCount";
import {useUser} from "@auth0/nextjs-auth0/client";
import Dropdown from "@/components/dropdown";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
    const {user} = useUser();

    console.log(user);

    return (
        <header className="bg-pink-100 py-4">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-pink-600">Heavenly Bakes</h1>
                <SearchBar/>
                <nav>
                    <ul className="flex space-x-4">
                        <li><Link href="/" className="text-pink-600 hover:text-pink-800">Home</Link></li>
                        <li><Link href="/bakes" className="text-pink-600 hover:text-pink-800">Our Selection</Link></li>
                        <li><Link href="#about" className="text-pink-600 hover:text-pink-800">About</Link></li>
                        <li><Link href="#contact" className="text-pink-600 hover:text-pink-800">Contact</Link></li>
                        <div className="flex space-x-2 ps-6">
                            {user ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <li className="text-pink-600 hover:text-pink-800">
                                            <span className="material-symbols-outlined">
                                                account_circle
                                            </span>
                                        </li>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="bg-pink-50">
                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuSeparator/>
                                        <DropdownMenuItem>
                                            My Orders
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <Link href="/api/auth/logout">
                                                Logout
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : <li><Link href="/api/auth/login" 
                                          className="text-pink-600 hover:text-pink-800">Login</Link></li>
                            }
                            <BasketCount/>
                        </div>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
