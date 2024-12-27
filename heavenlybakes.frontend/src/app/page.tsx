"use client"

import Image from "next/image";
import {fetchBakes} from "../../services/bakeService";
import {useEffect, useState} from "react";
import {Bake} from "../../interfaces/bake";
import BakeCard from "../../components/bakeCard";

export default function Home() {
  const [bakes, setBakes] = useState<Bake[]>([]);
  
  //Fetch Bakes from API on page load
  useEffect(() => {
    const getBakes = async () => {
      const fetchedBakes : Bake[] = await fetchBakes();
      setBakes(fetchedBakes);
    }
    getBakes();
  }, [])
  
  return (
      <div className="container m-auto py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-y-12">
          {bakes.map((bake : Bake) => (
              <BakeCard key={bake.id} bake={bake} />
          ))}
        </div>
      </div>
  );
}
