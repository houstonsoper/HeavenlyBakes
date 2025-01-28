"use client"

import {useUser} from "@/contexts/userContext";
import PageHeader from "@/components/pageHeader";

export default function AdminPage () {
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
                    title="Admin Dashboard"
                    description="Oversee and manage user accounts, orders, and system settings"
                />
            </div>
        </main>
    )
}