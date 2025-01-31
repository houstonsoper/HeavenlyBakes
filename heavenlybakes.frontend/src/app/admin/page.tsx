"use client"

import {useUser} from "@/contexts/userContext";
import PageHeader from "@/components/pageHeader";
import {Button} from "@/components/ui/button";
import Link from "next/link";

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
            <div className="container m-auto">
                <div className="grid grid-cols-2 py-10">
                    <div className="m-auto border p-12">
                        <Link href="/user-dashboard">
                            <span className="material-symbols-outlined w-full text-center">person</span>
                            <Button className="w-full">Manage Users</Button>
                        </Link>
                    </div>
                    <div className="m-auto border p-12">
                        <Link href="/orders-dashboard">
                            <span className="material-symbols-outlined w-full text-center">orders</span>
                            <Button className="w-full">Manage Orders</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    )
}