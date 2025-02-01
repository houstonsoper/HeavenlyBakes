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
    const [timeFilter, setTimeFilter] = useState<string>("");
    const [statusFilter, setStatusFilter] = useState<number>(0)
    
    //Fetch orders on mount
    useEffect(() => {
        const controller = new AbortController;
        const signal : AbortSignal = controller.signal;
        
        const getOrders = async () => {
            const offset: number = limit * (page - 1);
            const fetchedOrders : OrderWithOrderItems[] | [] = await fetchOrders({limit, offset, search, fromDate : timeFilter, statusId : statusFilter}, signal);
            setOrders(fetchedOrders);
        }
        getOrders();
        
        return () => controller.abort();
    }, [search, timeFilter, statusFilter]);
    
    //Fetch orders for next page
    useEffect(() => {
        const controller = new AbortController;
        const signal : AbortSignal = controller.signal;

        const getOrdersForNextPage = async () => {
            const offset: number = limit * page;
            const fetchedOrders : OrderWithOrderItems[] | [] = await fetchOrders({limit, offset, search, fromDate : timeFilter, statusId : statusFilter}, signal);
            setOrdersForNextPage(fetchedOrders);
        }
        getOrdersForNextPage();

        return () => controller.abort();
    }, [page, search, timeFilter, statusFilter]);
    
    
    //Fetch order statuses on mount
    useEffect(() => {
        const controller = new AbortController;
        const signal : AbortSignal = controller.signal;

        const getOrderStatuses = async () => {
            const fetchedOrderStatuses : OrderStatus[] = await fetchOrderStatuses(signal);
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
        
        //Slice the users array down to 1 page worth of results
        setOrders(prevOrders => prevOrders.slice(0, limit))
        setPage(1);
    }
    
    const handleSearch = (e : React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setSearch(e.currentTarget.value);
            setPage(1);
        }
    }
    
    const handleTimeFilter = (e : React.ChangeEvent<HTMLSelectElement>) => {
        const selectedTimeFilter : string = e.target.value;
        setPage(1);
        
        //Switch to filter time based on what the user has selected in the "From" dropdown
        switch (selectedTimeFilter) {
            case "1":
                let today = new Date();
                today.setHours(0, 0, 0, 0);
                setTimeFilter(today.toISOString());
                break;
                
            case "2":
                let lastWeek = new Date();
                lastWeek.setDate(lastWeek.getDate() - 7);
                lastWeek.setHours(0, 0, 0, 0); // Set time to 00:00:00
                setTimeFilter(lastWeek.toISOString());
                break;
                    
            case "3":
                let lastMonth = new Date();
                lastMonth.setMonth(lastMonth.getMonth() - 1);
                lastMonth.setHours(0, 0, 0, 0); // Set time to 00:00:00
                setTimeFilter(lastMonth.toISOString());
                break;
                
            case "4":
                let lastYear = new Date();
                lastYear.setFullYear(lastYear.getFullYear() - 1);
                lastYear.setHours(0, 0, 0, 0); // Set time to 00:00:00
                setTimeFilter(lastYear.toISOString());
                break;
               
            default :
                setTimeFilter("");
                break;
        }
    }
    
    const handleStatusFilter = (e : React.ChangeEvent<HTMLSelectElement>) => {
        setPage(1);
        setStatusFilter(Number(e.currentTarget.value));
        console.log(e.currentTarget.value);
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
                        <div className="flex justify-evenly">
                            <div>
                            <label>From:</label>
                                <select onChange={handleTimeFilter}>
                                    <option>All time</option>
                                    <option value="1">Today</option>
                                    <option value="2">Last 7 days</option>
                                    <option value="3">Last month</option>
                                    <option value="4">Last year</option>
                                </select>
                            </div>
                            <div>
                                <label>Status:</label>
                                <select onChange={handleStatusFilter}>
                                    <option value="0">All</option>
                                    {orderStatuses.map(status => (
                                        <option key={status.id} value={status.id}>{status.status}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <table className="table-fixed w-full">
                            <thead>
                            <tr className="text-left">
                                <th className="border-b border-gray-300 text-pink-700">Order Id</th>
                                <th className="border-b border-gray-300 text-pink-700">Name</th>
                                <th className="border-b border-gray-300 text-pink-700">Email</th>
                                <th className="border-b border-gray-300 text-pink-700">Date</th>
                                <th className="border-b border-gray-300 text-pink-700">Status</th>
                                <th className="border-b border-gray-300 text-pink-700">Total</th>
                                <th className="border-b border-gray-300 text-pink-700">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {orders.map((order) => (
                                <OrderDashboardRow 
                                    order={order} 
                                    key={order.orderId} 
                                    orderStatus={orderStatuses.find(os => os.id === order.orderStatusId) 
                                        ?? {id : 0, status : "Unknown"}}
                                    orderStatuses={orderStatuses}
                                />
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {ordersForNextPage.length > 0 ? (
                    <div className="flex">
                        <Button className="m-auto bg-pink-700 hover:bg-pink-800" onClick={handlePagination}>
                            Load more
                        </Button>
                    </div>
                ): (
                    <div className="flex">
                        <Button className="m-auto bg-gray-700 hover:bg-gray-800" onClick={handlePageReset}>
                            Go back
                        </Button>
                    </div>
                )}
            </div>
        </main>
    )
}