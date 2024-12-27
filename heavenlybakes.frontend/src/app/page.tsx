"use client"

import Image from "next/image";
import {fetchBakes, fetchPopularBakes} from "../../services/bakeService";
import {useEffect, useState} from "react";
import Bake from "../../interfaces/bake";
import BakeCard from "../../components/bakeCard";
import BakeCarousel from "../../components/bakeCarousel";

export default function Home() {
  const [bakes, setBakes] = useState<Bake[]>([]);
  
  //Fetch Popular Bakes from API on page load
  useEffect(() => {
    const getBakes = async () => {
      const fetchedBakes : Bake[] = await fetchPopularBakes(10);
      setBakes(fetchedBakes);
    }
    getBakes();
  }, [])
  
  return (
      <div className="container m-auto py-12">
          <div className="showcase">
              <h1 className="text-center pb-2">Popular</h1>
            <BakeCarousel bakes={bakes} />
          </div>
      </div>
  );
}
