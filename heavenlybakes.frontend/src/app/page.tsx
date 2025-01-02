"use client"

import Image from "next/image";
import {fetchBakes, fetchPopularBakes} from "@/services/bakeService";
import React, {useEffect, useState} from "react";
import Bake from "@/interfaces/bake";
import BakeCard from "../components/bakeCard";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export default function Home() {
    const [bakes, setBakes] = useState<Bake[]>([]);

    //Fetch Popular Bakes from API on page load
    useEffect(() => {
        const getBakes = async () => {
            const fetchedBakes: Bake[] = await fetchPopularBakes(20);
            setBakes(fetchedBakes);
        }
        getBakes();
    }, [])
    
    
    if(bakes.length > 0) {
    return (
        <div className="flex flex-col min-h-screen">
            <main>
                <section id="home" className="bg-pink-50 py-20">
                    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
                        <div className="md:w-1/2 mb-10 md:mb-0">
                            <h2 className="text-4xl font-bold text-pink-600 mb-4">Delicious Bakes for Every Occasion</h2>
                            <p className="text-lg mb-6">Indulge in our handcrafted bakes made with love and the finest ingredients.</p>
                            <Button className="bg-pink-500 hover:bg-pink-600 text-white">Order Now</Button>
                        </div>
                        <div className="md:w-1/2">
                            <Image src={bakes[0].imageUrl} width={600} height={400} alt="Featured Cake" className="rounded-lg shadow-lg" />
                        </div>
                    </div>
                </section>

                <section id="cakes" className="py-20">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center text-pink-600 mb-10">Our Popular Cakes</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {bakes.slice(0,3).map((bake : Bake) => (
                                <div key={bake.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <Image src={bake.imageUrl} width={400} height={300} alt={bake.name} className="w-full" />
                                    <div className="p-4">
                                        <h3 className="text-xl font-semibold mb-2">{bake.name}</h3>
                                        <p className="text-gray-">{bake.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="about" className="bg-pink-50 py-20">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">About Sweet Delights Bakery</h2>
                        <p className="text-lg text-center max-w-2xl mx-auto">
                            At Sweet Delights Bakery, we've been crafting delicious cakes for over 20 years. Our passion for baking and commitment to quality ingredients make our cakes truly special. Whether it's a birthday, wedding, or just because, we have the perfect cake for you.
                        </p>
                    </div>
                </section>

                <section id="contact" className="py-20">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center text-pink-600 mb-10">Contact Us</h2>
                        <form className="max-w-md mx-auto">
                            <div className="mb-4">
                                <input type="text" placeholder="Your Name" className="w-full" />
                            </div>
                            <div className="mb-4">
                                <input type="email" placeholder="Your Email" className="w-full" />
                            </div>
                            <div className="mb-4">
                                <textarea placeholder="Your Message" className="w-full" />
                            </div>
                            <Button type="submit" className="bg-pink-500 hover:bg-pink-600 text-white w-full">Send Message</Button>
                        </form>
                    </div>
                </section>
            </main>
        </div>
    )
}}

