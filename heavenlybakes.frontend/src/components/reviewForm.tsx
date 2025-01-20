"use client"

import Bake from "@/interfaces/bake";
import ReviewWithBake from "@/interfaces/reviewWithBake";
import Review from "@/interfaces/review";
import React, {FormEvent, RefObject, useRef} from "react";
import Image from "next/image";
import {UserContext, useUser} from "@auth0/nextjs-auth0/client";
import {postReview, updateReview} from "@/services/reviewService";

interface ReviewFormProps {
    bakeForReview: ReviewWithBake,
}

export default function ReviewForm({bakeForReview}: ReviewFormProps) {
    const bake: Bake = bakeForReview.bake;
    const review: Review | null = bakeForReview.review;
    const [rating, setRating] = React.useState(1);
    const formRef = useRef<HTMLFormElement>(null);
    const {user} : UserContext = useUser();

    const handleRating = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value: number = Number(event.target.value);

        if (value > 5) value = 5
        if (value <= 1) value = 1;

        setRating(value);
    }

    const handleReview = async (e : React.FormEvent) => {
        e.preventDefault();
        if(!formRef.current) return;
        
        //Capture form data
        const formData = new FormData(formRef.current);
        
        if(user && user.sub) {
            const newReview : Review = {
                customerId: user?.sub,
                bakeId: bake.id,
                title: formData.get("title") as string,
                feedback: formData.get("feedback") as string,
                rating: Number(formData.get("rating")),
                createDateTime: new Date(),
            }
            
            //Update review if already exists, else add a new one
            if (review) {
                await updateReview(newReview);
            } else {
                await postReview(newReview);
            }
        }
    }
    
    return (
        <div className="flex justify-center py-8">
            {bakeForReview ? (
                <div className="border justify-center p-4 gap-6 w-3/4 rounded">
                <h1>{bake.name}</h1>
                <div className="grid grid-cols-[1fr_2fr]">
                    <div>
                        <Image src={bake.imageUrl} width="200" height="200" alt={bake.name} />
                    </div>
                    <div>
                        <form
                            onSubmit={handleReview}
                            ref={formRef}>

                            <label className="block" htmlFor="title">Title: </label>
                            <input className="mb-4 w-full border" name="title" type="text" defaultValue={review?.title ?? ''} required/>

                            <label className="block" htmlFor="feedback">Share your review about this product: </label>
                            <textarea className="w-full mb-4 border" name="feedback" defaultValue={review?.feedback ?? ''}
                                      required/>

                            <label className="block" htmlFor="rating">Rating: </label>
                            <input className="w-full border mb-4" name="rating" type="number" value={rating} onChange={handleRating}
                                   defaultValue={review?.rating ?? ''} required/>
                            <button
                                className="bg-pink-600 text-white p-2 block w-1/2 m-auto">{review ? ("Update Review") : ("Add Review")}
                            </button>
                        </form>
                    </div>
                </div>
                </div>
            ) : null}
        </div>
    );
}