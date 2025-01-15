import React, {RefObject, useRef} from "react";

export default function Stars({ rating }: { rating: number }) {
    const stars = 5;

    return (
        <div className="flex">
            {Array.from({ length: stars }).map((_, i) => (
                <span
                    key={i}
                    className={`material-symbols-outlined ${
                        i < rating ? `text-pink-600` : `text-gray-100`
                    }`}
                >
                    star
                </span>
            ))}
        </div>
    );
}