'use client'

import {useParams, useRouter} from "next/navigation";
import React, {useState, useEffect, useRef, RefObject} from "react";
import Image from "next/image";
import Link from 'next/link';
import {Button} from "@/components/ui/button";
import {fetchBakeById} from "@/services/bakeService";
import {useBasket} from "@/contexts/basketContext";
import Bake from "@/interfaces/bake";
import BasketItem from "@/interfaces/basketItem"
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {Params} from "next/dist/server/request/params";
import Review from "@/interfaces/review";
import {fetchRating, fetchReviews} from "@/services/reviewService";
import ReviewCard from "@/components/reviewCard";
import Stars from "@/components/stars";

export default function Details() {
    const [bake, setBake] = useState<Bake | null>(null);
    const params: Params = useParams();
    const router: AppRouterInstance = useRouter();
    const [quantity, setQuantity] = useState<number>(1);
    const {addToBasket} = useBasket();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [rating, setRating] = useState<number>(0);
    const stars: number[] = [1, 2, 3, 4, 5];

    useEffect(() => {
        const controller = new AbortController();
        const signal: AbortSignal = controller.signal;

        //Fetch the bake and it's details
        const getBakeDetails = async () => {
            const fetchedBake: Bake | null = await fetchBakeById(Number(params.id), signal);
            if (fetchedBake) {
                setBake(fetchedBake);
                const bakeId : number = fetchedBake.id;

                //Fetch reviews
                const fetchedReviews: Review[] = await fetchReviews({bakeId : bakeId}, signal);
                if (fetchedReviews) setReviews(fetchedReviews)

                //Fetch rating
                const rating: number = await fetchRating(fetchedBake.id, signal);
                if (rating) setRating(rating);
            }
        }
        getBakeDetails();

        return () => controller.abort();
    }, [params.id])

    const addToBasketHandler = () => {
        if (bake) {
            const basketItem: BasketItem = {
                id: bake.id,
                name: bake.name,
                basePrice: bake.basePrice,
                price: bake.price,
                quantity: quantity,
                imageUrl: bake.imageUrl,
                totalPrice: bake.price * quantity,
                discount: bake.discount,
            };
            addToBasket(basketItem);
            router.push(`/basket`);
        }
    }

    console.log("reviews", reviews);

    if (!bake) return null;

    return (
        <main>
            <div className="flex flex-col min-h-screen">
                <div className="flex-grow container mx-auto px-4 py-8">
                    <div className="grid md:grid-cols-2 gap-8 items-start">
                        <div className="bake-image-container m-auto">
                            <Image
                                className="rounded-lg shadow-lg"
                                src={bake.imageUrl}
                                alt={bake.name}
                                width={400}
                                height={400}
                            />
                        </div>
                        <div className="bake-details-container">
                            <h1 className="text-3xl font-bold text-pink-600">{bake.name}</h1>
                            <div className="flex mb-2">
                                <Stars rating={rating}/>
                                <p className="ms-1 text-gray-400">{reviews.length}</p>
                            </div>
                            <div>
                                <p className="text-2xl font-semibold text-gray-700">£{bake.price.toFixed(2)}</p>
                                {bake.discount ? (
                                        <div className="text-red-600 me-1 font-semibold flex">
                                            <p className="me-1"> Save {bake.discount}%</p>
                                            <p className="line-through">| Was £{bake.basePrice.toFixed(2)} </p>
                                        </div>)
                                    : null}
                            </div>
                            <p className="text-gray-600 mt-4 mb-6">{bake.description}</p>
                            <div className="flex items-center space-x-4 mb-6">
                                <Button
                                    onClick={() => quantity > 1 ? setQuantity(quantity - 1) : null}
                                    variant="outline"
                                >
                                     <span className="material-symbols-outlined">
                                         remove
                                     </span>
                                </Button>
                                <span className="text-xl font-semibold">{quantity}</span>
                                <Button
                                    onClick={() => setQuantity(quantity + 1)}
                                    variant="outline"
                                >
                                    <span className="material-symbols-outlined p-0">
                                        add
                                    </span>
                                </Button>
                            </div>
                            <Button
                                onClick={addToBasketHandler}
                                className="w-full bg-pink-500 hover:bg-pink-600 text-white"
                            >
                                Add to Basket
                            </Button>
                        </div>
                    </div>
                    <div>
                        <div className="text-center">
                            <h1 className="pt-12">Customer reviews</h1>
                            <div className="inline-flex">
                                <Stars rating={rating}/>
                                <p className="px-1 my-auto">{rating} out of 5</p>
                            </div>
                            {/* Progress Bars for each rating */}
                            <div className="flex flex-col m-auto justify-center w-1/2">
                                {stars.map((star: number) => {
                                    const count : number = reviews.filter((r : Review) :boolean => r.rating === star).length; // Calculate the count for each star
                                    return (
                                        <div key={star} className="inline-flex text-nowrap">
                                            <h3 className="my-auto pe-2">{star} Stars</h3>
                                            <progress
                                                className="my-2 w-full"
                                                value={count}
                                                max={reviews.length}
                                                aria-label={`${count} reviews with ${star} stars`}
                                            ></progress>
                                            <h3 className="my-auto ps-2">({count})</h3>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="w-3/4 m-auto">
                            {reviews.length > 0 && (
                                reviews.map((review: Review) => (
                                    <ReviewCard review={review} key={review.userId}/>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

