"use client"

import Bake from "@/interfaces/bake";
import ReviewWithBake from "@/interfaces/reviewWithBake";
import Review from "@/interfaces/review";
import React, {RefObject} from "react";
import Image from "next/image";

interface ReviewFormProps {
    bakeForReview: ReviewWithBake;
}

export default function ReviewForm({bakeForReview}: ReviewFormProps) {
    const bake: Bake = bakeForReview.bake;
    const review: Review = bakeForReview.review;
    const [rating, setRating] = React.useState(1);

    const handleRating = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value: number = Number(event.target.value);

        if (value > 5) value = 5
        if (value <= 1) value = 1;

        setRating(value);
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
                        <form>
                            <div>
                                <label className="block" htmlFor="title">Title: </label>
                                <input name="title" type="text"/>
                            </div>
    
                            <div>
                                <label className="block" htmlFor="feedback">Feedback: </label>
                                {bakeForReview.review.feedback ? (
                                    <textarea className="w-full" name="feedback" value={bakeForReview.review.feedback} disabled/>
                                ) : (
                                    <textarea className="w-full" name="feedback"/>
                                )}
                            </div>
                            <div>
                                <label className="block" htmlFor="rating">Rating: </label>
                                <input name="rating" type="number" value={rating} onChange={handleRating}/>
                            </div>
                        </form>
                    </div>
                </div>
            ) : null}
        </div>
    );
}