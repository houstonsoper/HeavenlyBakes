"use client";

import Image from "next/image";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import SearchBar from "@/components/searchBar";
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

export default function Navbar() {
    const [bakeTypes, setBakeTypes] = useState<BakeType[]>([]);
    const {user, logout} = useUser();
    
    //Fetch bake types from API
    useEffect(() => {
        const controller = new AbortController();
        const signal : AbortSignal = controller.signal;
        
        const GetBakeTypes  = async () => {
            setBakeTypes(await fetchBakeTypes(signal))
        }

        GetBakeTypes();
        
        //Abort fetch request if component unmounts
        return () => controller.abort();
    }, [])
    
    console.log("user", user);
    return (
        <header className="bg-pink-100 py-4">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-pink-600">Heavenly Bakes</h1>
                <SearchBar/>
                <nav>
                    <ul className="flex space-x-4">
                        <li><Link href="/" className="text-pink-600 hover:text-pink-800">Home</Link></li>
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
                                {bakeTypes.map((bakeType : BakeType) => (
                                    <div key={bakeType.id}>
                                        <Link href={`/bakes/?type=${bakeType.type}`}>
                                            <DropdownMenuItem className="hover:cursor-pointer">
                                                {bakeType.type}
                                            </DropdownMenuItem>
                                        </Link>
                                        <DropdownMenuSeparator />
                                    </div>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                            ) : <li> <Link href="/bakes" className="text-pink-600 hover:text-pink-800">Our Selections </Link></li>
                        }
                        <li><Link href="#about" className="text-pink-600 hover:text-pink-800">About</Link></li>
                        <li><Link href="#contact" className="text-pink-600 hover:text-pink-800">Contact</Link></li>
                        <div className="flex space-x-2 ps-6">
                            {/* User Dropdown */}
                            {user ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <li className="text-pink-600 hover:text-pink-800">
                                            <span className="material-symbols-outlined">
                                                account_circle
                                            </span>
                                        </li>
                                    </DropdownMenuTrigger >
                                    <DropdownMenuContent className="bg-pink-50">
                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuSeparator/>
                                        <DropdownMenuItem>
                                            <Link href="/orders">
                                                My Orders
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                                        {/*If the user is admin then display "Admin Panel"*/}
                                        { user.userGroup.groupName === "Admin" && 
                                            <>
                                            <Link href="/admin">
                                            <DropdownMenuItem>Admin Panel</DropdownMenuItem>
                                            </Link>
                                            </>}
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <button onClick={async () => {await logout()}}>
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
