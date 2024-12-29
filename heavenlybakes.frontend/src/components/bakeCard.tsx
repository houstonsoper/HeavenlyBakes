import Bake from "../interfaces/bake";
import Image from "next/image";
import Link from "next/link";

interface BakeCardProps{
    bake: Bake;
}

export default function BakeCard({bake} : BakeCardProps){
    return(
        <div className="card m-auto">
            <Link href={"/bakes/"+bake.id}>
            <div className="card-top">
                <Image src={bake.imageUrl} alt={bake.name} width={200} height={200} />
            </div>

            <div className="card-bottom">
                <h2>{bake.name}</h2>
                <p>£{bake.price.toFixed(2)}</p>
            </div>
            </Link>
        </div>
    );
}
