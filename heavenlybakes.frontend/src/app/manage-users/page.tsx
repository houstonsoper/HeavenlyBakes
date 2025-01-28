"use client"

import {useUser} from "@/contexts/userContext";
import PageHeader from "@/components/pageHeader";

export default function ManageUsersPage (){

    const { user } = useUser();
    
    //If user is not an admin return a 404 error page
    if (user?.userGroup.groupName !== "Admin") {
        return (
            <main>
                <h1 className="text-center py-12">404 - Page Not Found</h1>
            </main>
        )
    }
    
    return (
        <main>
            <div>
                <PageHeader
                    title="User Dashboard"
                    description="Manage users within the system"
                />
            </div>
            <div className="container m-auto py-12">
                <div className="flex justify-center border py-4 h-screen">
                    <div className="w-1/2">
                        <input className="bg-gray-100 w-full" type="text"/>
                    </div>
                </div>
            </div>
        </main>
    )
}