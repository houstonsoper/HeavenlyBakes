import Bake from "../interfaces/bake";
import Image from "next/image";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import BasketItem from "@/interfaces/basketItem";
import {useBasket} from "@/contexts/basketContext";
import {BasketContextType} from "@/interfaces/basketContextType";
import {useToast} from "@/hooks/use-toast";

interface BakeCardProps{
    bake: Bake;
}

export default function BakeCard({bake} : BakeCardProps){
    const {addToBasket} : BasketContextType = useBasket();
    const {toast} = useToast();
    
    const addToBasketHandler = () =>{

        //Create a basketItem object with the details of the item
        if(bake) {
            const basketItem: BasketItem = {
                id: bake.id,
                name: bake.name,
                price: bake.price,
                basePrice: bake.basePrice,
                quantity: 1,
                imageUrl: bake.imageUrl,
                totalPrice: bake.price,
                discount: bake.discount,
            };
            addToBasket(basketItem);

            //Alert the user that the item has been added to basket
            toast ({
                title: "Added to Basket",
                description: `${bake.name} x1`,
                duration: 2000,
            })
        }
    }
    
    return(
        <div className="card m-auto bg-white rounded overflow-hidden shadow-md max-w-48">
            <Link href={"/bakes/"+bake.id}>
                <div className="card-top">
                    <Image src={bake.imageUrl} alt={bake.name} width={200} height={200} />
                </div>
                <div className="card-bottom rounded pt-2 px-2 text-gray-700">
                    <h2 className="truncate">{bake.name}</h2>
                    <div className="flex">
                        {bake.discount ? (
                            <p className="text-red-600 line-through me-1 font-semibold">
                                £{bake.basePrice.toFixed(2)}
                            </p>
                        ) : null}
                        <p>£{bake.price.toFixed(2)}</p>
                    </div>
                </div>
            </Link>
            <div className="flex justify-center p-2">
                <Button onClick={addToBasketHandler} className="bg-pink-500 hover:bg-pink-600 w-full h-6">Add to Basket</Button>
            </div>
        </div>
    );
}
