﻿"use client";

import Image from "next/image";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import BasketCount from "@/components/basketCount";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {BakeType} from "@/interfaces/bakeType";
import {fetchBakeTypes} from "@/services/bakeService";
import {useUser} from "@/contexts/userContext";
import {userLogout} from "@/services/userService";
import {Button} from "@/components/ui/button";

export default function Navbar() {
    const [bakeTypes, setBakeTypes] = useState<BakeType[]>([]);
    const {auth} = useUser();
    const [searchTerm, setSearchTerm] = useState<string>("");
    const router = useRouter();

    //Fetch bake types from API
    useEffect(() => {
        const controller = new AbortController();
        const signal: AbortSignal = controller.signal;

        const GetBakeTypes = async () => {
            setBakeTypes(await fetchBakeTypes(signal))
        }

        GetBakeTypes();

        //Abort fetch request if component unmounts
        return () => controller.abort();
    }, [])

    //Handle the users inputted search term
    const handleSearchTerm = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    //Handle when the user submits the search
    const handleSearch = () => {
        router.push("/bakes?search=" + searchTerm);
        setSearchTerm("");
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    }

    return (
        <header className="bg-pink-100 py-4">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-pink-600">Heavenly Bakes</h1>
                <div className="flex items-center border rounded-lg overflow-hidden shadow-sm w-[20rem] h-[2rem] my-auto mx-auto lg:mx-0">
                    <span className="p-2 text-grey-400 material-symbols-outlined bg-gray-100">search</span>
                    <input placeholder={"Search our selection"}
                           value={searchTerm}
                           onKeyDown={handleKeyDown}
                           onChange={handleSearchTerm}
                           className="w-full p-2 focus:outline-none"
                    />
                </div>
                <nav>
                    <ul className="flex space-x-4 items-center">
                        <li><Link href="/" className="text-pink-600 hover:text-pink-800 align-middle">Home</Link></li>
                        {/* Our Selections Dropdown */}
                        {bakeTypes.length > 0 ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <li className="text-pink-600 hover:text-pink-800">Our Selections</li>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <Link href="/bakes">
                                        <DropdownMenuItem className="hover:cursor-pointer">All</DropdownMenuItem>
                                    </Link>
                                    <DropdownMenuSeparator/>
                                    {/* Map each bake type to a dropdown item */}
                                    {bakeTypes.map((bakeType: BakeType) => (
                                        <div key={bakeType.id}>
                                            <Link href={`/bakes/?type=${bakeType.type}`}>
                                                <DropdownMenuItem className="hover:cursor-pointer">
                                                    {bakeType.type}
                                                </DropdownMenuItem>
                                            </Link>
                                            <DropdownMenuSeparator/>
                                        </div>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : <li><Link href="/bakes" className="text-pink-600 hover:text-pink-800">Our Selections </Link>
                        </li>
                        }
                        <div className="flex space-x-2 ps-6">
                            {/* User Dropdown */}
                            {auth.user ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <li className="text-pink-600 hover:text-pink-800">
                                            <span className="material-symbols-outlined">
                                                account_circle
                                            </span>
                                        </li>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuSeparator/>
                                        <DropdownMenuItem>
                                            <Link href="/orders">
                                                My Orders
                                            </Link>
                                        </DropdownMenuItem>
                                        {/*If the user is admin then display "Admin Panel"*/}
                                        {auth.user.userGroup.groupName === "Admin" &&
                                            <>
                                                <Link href="/admin">
                                                    <DropdownMenuItem>Admin Panel</DropdownMenuItem>
                                                </Link>
                                            </>}
                                        <DropdownMenuSeparator/>
                                        <DropdownMenuItem>
                                            <button onClick={async () => {
                                                await auth.logout()
                                            }}>
                                                Logout
                                            </button>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : <li><Link href="/login"
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
