import {useUser} from "@auth0/nextjs-auth0/client";
import PageHeader from "@/components/pageHeader";

export default function orders(){
    return(
        <main>
            <PageHeader title="Orders" description="Keep track of all your orders in one place."/>
        </main>
    )
}