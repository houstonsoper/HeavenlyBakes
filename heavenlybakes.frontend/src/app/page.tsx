"use client"

import Image from "next/image";
import {fetchBakes} from "../../services/bakeService";
import {useEffect, useState} from "react";
import {Bake} from "../../Interfaces/bake";

export default function Home() {
  const [bakes, setBakes] = useState<Bake[]>([]);
  
  //Fetch Bakes from API on page load
  useEffect(() => {
    const getBakes = async () => {
      const fetchedBakes = await fetchBakes();
      setBakes(fetchedBakes);
    }
    getBakes();
  }, [])
  
  return (
    <h1>Hello World</h1>
  );
}
