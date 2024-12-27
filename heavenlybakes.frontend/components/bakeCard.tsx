import {Bake} from "../interfaces/bake";
import Image from "next/image";

interface BakeCardProps{
    bake: Bake;
}

export default function BakeCard({bake} : BakeCardProps){
    return(
        <div className="card m-auto">
            <div className="card-top">
                <Image src={bake.imageUrl} alt={bake.name} width={200} height={200} />
            </div>

            <div className="card-bottom">
                <h1>{bake.name}</h1>
                <p>£{bake.price.toFixed(2)}</p>
            </div>
        </div>
    );
}
