"use client"

import { useUser } from "@/contexts/userContext"
import PageHeader from "@/components/pageHeader"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Users, ShoppingBag } from "lucide-react"

export default function AdminPage() {
    const { auth } = useUser()

    if (auth.user?.userGroup.groupName !== "Admin") {
        return (
            <main className="min-h-screen flex items-center justify-center bg-gray-50">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-center text-2xl text-pink-600">404 - Page Not Found</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-center text-gray-600">You don't have permission to access this page.</p>
                    </CardContent>
                </Card>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-gray-50">
            <PageHeader title="Admin Dashboard" description="Oversee and manage user accounts, orders, and system settings" />
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="hover:shadow-lg transition-shadow duration-300">
                        <Link href="/user-dashboard" className="block h-full">
                            <CardHeader className="text-center">
                                <CardTitle className="text-2xl font-bold text-pink-600">Manage Users</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center">
                                <Users size={64} className="text-pink-500 mb-4" />
                                <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white">Go to User Management</Button>
                            </CardContent>
                        </Link>
                    </Card>
                    <Card className="hover:shadow-lg transition-shadow duration-300">
                        <Link href="/orders-dashboard" className="block h-full">
                            <CardHeader className="text-center">
                                <CardTitle className="text-2xl font-bold text-pink-600">Manage Orders</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center">
                                <ShoppingBag size={64} className="text-pink-500 mb-4" />
                                <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white">Go to Order Management</Button>
                            </CardContent>
                        </Link>
                    </Card>
                </div>
            </div>
        </main>
    )
}

