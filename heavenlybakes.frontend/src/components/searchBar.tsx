import React, {useEffect, useState} from "react";
import Bake from "@/interfaces/bake";
import {fetchBakes, fetchPopularBakes} from "@/services/bakeService";
import router from "next/router";
import {useRouter} from "next/navigation";

export default function SearchBar() {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const router = useRouter();
    
    
    //Handle the users inputted search term
    const handleSearchTerm = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    }
    
    //Handle when the user submits the search
    const handleSearch = () => {
        router.push("/bakes?search=" + searchTerm);
        setSearchTerm("");
    }
    
    return (
        <div>
            <input placeholder={"Search"}
                   value={searchTerm}
                   onChange={handleSearchTerm}/>
            <button onClick={handleSearch}>Search</button>
        </div>
    )
}