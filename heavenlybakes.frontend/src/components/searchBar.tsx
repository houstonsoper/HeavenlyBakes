import React, {ChangeEvent, useEffect, useState} from "react";
import Bake from "@/interfaces/bake";
import {fetchBakes, fetchPopularBakes} from "@/services/bakeService";
import router from "next/router";
import {useRouter} from "next/navigation";

export default function SearchBar() {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const router = useRouter();
    
    //Handle the users inputted search term
    const handleSearchTerm = (event : React.ChangeEvent<HTMLInputElement>) => {
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
        <div className="flex justify-center">
            <input placeholder={"Search our selection"}
                   value={searchTerm}
                   onKeyDown={handleKeyDown}
                   onChange={handleSearchTerm}/>
            <button onClick={handleSearch} className="flex">
                <span className="material-symbols-outlined ms-2 bg-orange-300 rounded px-1">
                    search
                </span>
            </button>
        </div>
    )
}