"use client"

import {ChangeEvent, useEffect, useRef, useState} from "react";
import PageHeader from "@/components/pageHeader";
import OrderWithOrderItems from "@/interfaces/orderWithOrderItems";
import {fetchOrders} from "@/services/orderService";
import OrderDashboardRow from "@/components/orderDashboardRow";
import OrderStatus from "@/interfaces/orderStatus";
import {fetchOrderStatuses} from "@/services/orderStatusesService";
import {Button} from "@/components/ui/button";

export default function OrdersDashboardPage () {
    const searchRef = useRef<HTMLInputElement>(null);
    const [search, setSearch] = useState("");
    const [orders, setOrders] = useState<OrderWithOrderItems[]>([]);
    const [ordersForNextPage, setOrdersForNextPage] = useState<OrderWithOrderItems[]>([]);
    const [orderStatuses, setOrderStatuses] = useState<OrderStatus[]>([]);
    const limit = 10;
    const [page, setPage] = useState<number>(1);
    
    //Fetch orders on mount
    useEffect(() => {
        const controller = new AbortController;
        const signal : AbortSignal = controller.signal;
        
        const getOrders = async () => {
            const offset: number = limit * (page - 1);
            const fetchedOrders : OrderWithOrderItems[] | [] = await fetchOrders({limit, offset, search}, signal);
            setOrders(fetchedOrders);
        }
        getOrders();
        
        return () => controller.abort();
    }, [search]);
    
    //Fetch orders for next page
    useEffect(() => {
        const controller = new AbortController;
        const signal : AbortSignal = controller.signal;

        const getOrdersForNextPage = async () => {
            const offset: number = limit * page;
            const fetchedOrders : OrderWithOrderItems[] | [] = await fetchOrders({limit, offset, search}, signal);
            setOrdersForNextPage(fetchedOrders);
        }
        getOrdersForNextPage();

        return () => controller.abort();
    }, [page, search]);
    
    
    //Fetch order statuses on mount
    useEffect(() => {
        const controller = new AbortController;
        const signal : AbortSignal = controller.signal;

        const getOrderStatuses = async () => {
            const fetchedOrderStatuses : OrderStatus[] = await fetchOrderStatuses();
            setOrderStatuses(fetchedOrderStatuses)
        }
        getOrderStatuses();
        
        return () => controller.abort();
    }, []);
    
    const handlePagination = () => {
        setOrders(orders => [...orders, ...ordersForNextPage]);
        setPage(page => page + 1);
    }
    
    const handlePageReset = () => {
        //If there is text in the search bar clear it
        if (searchRef.current) {
            searchRef.current.value = "";
            setSearch("");
        }
        //Reset the page state back to 1 
        setPage(1);
        
        //Slice the users array down to 1 page worth of results
        setOrders(prevOrders => prevOrders.slice(0, limit))
    }
    
    const handleSearch = (e : React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setSearch(e.currentTarget.value);
            setPage(1);
        }
    }
    
    return (
        <main>
            <div>
                <PageHeader
                    title="Orders dashboard"
                    description="Manage users orders within the system"
                />
            </div>
            <div className="container m-auto my-12 px-5">
                <div className="py-4">
                    <div className="w-1/2 m-auto">
                        <div className="flex border rounded w-full mb-12 px-1">
                            <span className="m-auto material-symbols-outlined">search</span>
                            <input
                                onKeyDown={handleSearch}
                                defaultValue={search}
                                className="w-full p-1"
                                type="text"
                                placeholder="Search by order id, name or email"
                                ref={searchRef}
                            />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <table className="table-fixed w-full">
                            <thead>
                            <tr className="text-left">
                                <th className="border-b border-gray-300 text-pink-700">Order Id</th>
                                <th className="border-b border-gray-300 text-pink-700">Name</th>
                                <th className="border-b border-gray-300 text-pink-700">Email</th>
                                <th className="border-b border-gray-300 text-pink-700">Items</th>
                                <th className="border-b border-gray-300 text-pink-700">Date</th>
                                <th className="border-b border-gray-300 text-pink-700">Status</th>
                                <th className="border-b border-gray-300 text-pink-700">Total</th>
                            </tr>
                            </thead>
                            <tbody>
                            {orders.map((order) => (
                                <OrderDashboardRow 
                                    order={order} 
                                    key={order.orderId} 
                                    orderStatus={orderStatuses.find(os => os.id === order.orderStatusId) 
                                        ?? {id : 0, status : "Unknown"}}
                                />
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {ordersForNextPage.length > 0 ? (
                    <div className="flex">
                        <Button className="m-auto" onClick={handlePagination}>
                            Load more
                        </Button>
                    </div>
                ): (
                    <div className="flex">
                        <Button className="m-auto" onClick={handlePageReset}>
                            Go back
                        </Button>
                    </div>
                )}
            </div>
        </main>
    )
}