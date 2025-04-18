﻿"use client"

import Bake from "@/interfaces/bake";
import ReviewWithBake from "@/interfaces/reviewWithBake";
import Review from "@/interfaces/review";
import React, { useEffect, useRef, useState} from "react";
import Image from "next/image";
import {deleteReview, postReview, updateReview} from "@/services/reviewService";
import Link from "next/link";
import {useUser} from "@/contexts/userContext";
import {Button} from "@/components/ui/button";

interface ReviewFormProps {
    bakeForReview: ReviewWithBake,
    updatePageAction: React.Dispatch<React.SetStateAction<boolean>>,
}

export default function ReviewFormCard ({bakeForReview, updatePageAction}: ReviewFormProps) {
    const bake: Bake = bakeForReview.bake;
    const review: Review | null = bakeForReview.review;
    const [rating, setRating] = useState<number>(1);
    const formRef = useRef<HTMLFormElement>(null);
    const [title, setTitle] = useState<string>("");
    const [feedback, setFeedback] = useState<string>("");
    const {auth} = useUser();

    useEffect(() => {
        const review : Review | null = bakeForReview.review;
        
        if (review ) {
            setFeedback(review.feedback)
            setTitle(review.title)
            setRating(review.rating)
        }
    }, []);
    
    const handleRating = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value: number = Number(event.target.value);

        if (value > 5) value = 5
        if (value <= 1) value = 1;

        setRating(value);
    }
    
    const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input : string = event.target.value;
        if (input.length > 50) {
            setTitle(input.substring(0, 50));
        } else {
            setTitle(input);
        }
    }

    const handleFeedback = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const input : string = event.target.value;
        if (input.length > 500) {
            setFeedback(input.substring(0, 500));
        } else {
            setFeedback(input);
        }
    }

    const handleAddReview = async (e : React.FormEvent) => {
        e.preventDefault();
        if(!formRef.current) return;
        
        //Capture form data
        const formData = new FormData(formRef.current);
        
        if(auth.user) {
            const newReview : Review = {
                userId: auth.user.userId,
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
            
            updatePageAction(true);
        }
    }
    
    const handleDeleteReview = async () => {
        if (review) {
            await deleteReview(review);
            updatePageAction(true);
        }
    }
    
    return (
        <div className="flex justify-center py-8">
            {bakeForReview ? (
                <div className="justify-center gap-6 w-3/4 p-3 shadow-md rounded-lg border border-gray-100">
                    <h2 className="text-pink-700 font-bold mb-2 text-[1.15rem]">{bake.name}</h2>
                    <div className="grid grid-cols-[1fr_2fr]">
                        <div>
                            <Link href={`/bakes/${bake.id}`}>
                                <Image className="rounded" src={bake.imageUrl} width="200" height="200" alt={bake.name}/>
                            </Link>
                        </div>
                        <div>
                            <form
                                onSubmit={handleAddReview}
                                ref={formRef}>

                                {/* Review Title */}
                                <label className="block text-gray-800" htmlFor="title">Review title: </label>
                                <input className="mb-4 w-full border"
                                       name="title"
                                       type="text"
                                       defaultValue={review?.title ?? ''}
                                       onChange={handleTitle}
                                       required
                                />

                                {/* Review Feedback */}
                                <label className="block text-gray-800" htmlFor="feedback">Share your review about this
                                    product: </label>
                                <textarea className="w-full mb-4 border outline-0" 
                                          name="feedback"
                                          defaultValue={review?.feedback ?? feedback}
                                          onChange={handleFeedback}
                                          required
                                />

                                {/* Review Rating */}
                                <label className="block text-gray-800" htmlFor="rating">Rating: </label>
                                <input className="w-full border mb-4"
                                       name="rating" type="number"
                                       onChange={handleRating}
                                       defaultValue={review?.rating ?? 1}
                                       required
                                />
                                
                                <div className="flex gap-6">
                                    <Button type="submit"
                                            className="bg-pink-600 hover:bg-pink-700 text-white px-5"
                                            size="sm"
                                    >
                                        {review ? ("Update Review") : ("Add Review")}
                                    </Button>
                                    {review ? (
                                        <Button onClick={handleDeleteReview} 
                                                type="button"
                                                className="bg-gray-800 hover:bg-gray-900 text-white px-5"
                                                size="sm"
                                        >
                                            Delete Review
                                        </Button>) : null}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}