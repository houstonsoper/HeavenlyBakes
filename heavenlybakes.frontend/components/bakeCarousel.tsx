import Bake from "../interfaces/bake";
import BakeCard from "../components/bakeCard";
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

interface Bakes{
    bakes: Bake[];
}

export default function BakeCarousel ({bakes} : Bakes) {
    return (
        <Carousel
            opts={{
                align: "start",
            }}
            className="w-full max-w-sm"
        >
            <CarouselContent>
                {bakes.map(bake => (
                    <CarouselItem key={bake.id} className="basis-1/2">
                        <div>
                            <Card>
                                <CardContent className="flex aspect-square  items-center justify-center p-6">
                                    <BakeCard bake={bake}/>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}