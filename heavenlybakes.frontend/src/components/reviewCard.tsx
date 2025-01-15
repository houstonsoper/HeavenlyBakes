import Review from "@/interfaces/review";
import React, {RefObject, useRef, useState} from "react";
import {NumberArray} from "lru-cache";
import Stars from "@/components/stars";

interface ReviewCardProps {
    review : Review;
}
export default function ReviewCard({review} : ReviewCardProps) {
    const stars : RefObject<number> = useRef<number>(5);
    
    return (
        <div className="m-auto">
            <div className="border mt-3 mb-8 p-3">
                <div>
                    <div className="flex">
                        <h2 className="font-semibold">{review.title}</h2>
                        <div className="flex ms-auto">
                            <Stars rating={review.rating} />
                        </div>
                    </div>
                    <p className="text-gray-600"> {review.formattedDate}</p>
                    <p className="text-gray-600">{review.customerId}</p>
                </div>
                <div className="pt-3">
                <p>{review.feedback}</p>
                </div>
            </div>
        </div>
    )
}