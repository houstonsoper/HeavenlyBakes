"use client"

import Bake from "@/interfaces/bake";
import ReviewWithBake from "@/interfaces/reviewWithBake";
import Review from "@/interfaces/review";
import React, {FormEvent, RefObject, useRef} from "react";
import Image from "next/image";
import {UserContext, useUser} from "@auth0/nextjs-auth0/client";
import {postReview} from "@/services/reviewService";

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

    const handleAddReview = async (e : React.FormEvent) => {
        e.preventDefault();
        if(!formRef.current) return;
        
        //Capture form data
        const formData = new FormData(formRef.current);
        
        if(user && user.sub) {
            const data: Review = {
                customerId: user?.sub,
                bakeId: bake.id,
                title: formData.get("title") as string,
                feedback: formData.get("feedback") as string,
                rating: Number(formData.get("rating")),
                createDateTime: new Date(),
            }
            console.log(data);
            await postReview(data);
        }
    }


    return (
        <div className="flex justify-center">
            {bakeForReview ? (
                <div className="grid grid-cols-[1fr_2fr] border justify-center p-4 gap-6">
                    <div>
                        <h1>{bake.name}</h1>
                        <Image src={bake.imageUrl} width="200" height="200" alt={bake.name}/>
                    </div>
                    <div>
                        <form 
                            onSubmit={handleAddReview} 
                            ref={formRef}>
                            
                                <label className="block" htmlFor="title">Title: </label>
                                <input name="title" type="text" required/>
                            
                                <label className="block" htmlFor="feedback">Feedback: </label>
                                {review ? (
                                    <textarea className="w-full" name="feedback" value={review.feedback} required/>
                                ) : (
                                    <textarea className="w-full" name="feedback" required/>
                                )}
                            
                                <label className="block" htmlFor="rating">Rating: </label>
                                <input name="rating" type="number" value={rating} onChange={handleRating} required/>
                            <button className="bg-pink-600 text-white p-2">Add Review</button>
                        </form>
                    </div>
                </div>
            ) : null}
        </div>
    );
}