"use client"

import PageHeader from "@/components/pageHeader";
import {getOrdersByUserId, groupOrdersByDate} from "@/services/orderService";
import React, {useEffect, useState} from "react";
import orderWithOrderItems from "@/interfaces/orderWithOrderItems";
import GroupedOrders from "@/interfaces/groupedOrders";
import OrderCard from "@/components/orderCard";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import Review from "@/interfaces/review";
import {useUser} from "@/contexts/userContext";
import {PaymentMethod} from "@/interfaces/paymentMethod";
import {fetchPaymentMethods} from "@/services/paymentService";
import OrderStatus from "@/interfaces/orderStatus";
import {fetchOrderStatuses} from "@/services/orderStatusesService";
import {Button} from "@/components/ui/button";
import OrderWithOrderItems from "@/interfaces/orderWithOrderItems";

export default function orders() {
  const [orders, setOrders] = useState<orderWithOrderItems[]>([]);
  const [ordersForNextPage, setOrdersForNextPage] = useState<orderWithOrderItems[]>([]);
  const [groupedOrders, setGroupedOrders] = useState<GroupedOrders[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const {auth} = useUser();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [orderStatuses, setOrderStatuses] = useState<OrderStatus[]>([]);
  const [page, setPage] = useState<number>(1);
  const limit = 10;

  //Fetch orders on mount
  useEffect(() => {
    const controller = new AbortController();
    const signal: AbortSignal = controller.signal;
    const getOrders = async () => {
      if (auth.user != null) {
        const fetchedOrders: orderWithOrderItems[] = await getOrdersByUserId({
          userId: auth.user.userId,
          limit,
          offset: (page - 1) * limit
        }, signal);
        const groupedOrders: GroupedOrders[] = groupOrdersByDate(fetchedOrders); //Group the orders by date
        setGroupedOrders(groupedOrders);
        setOrders(fetchedOrders);
      }
    }
    getOrders();

    //Cleanup function to abort fetch when component unmounts
    return () => controller.abort();
  }, [auth.user])

  //Fetch orders for next page on mount 
  useEffect(() => {
    const controller = new AbortController();
    const signal: AbortSignal = controller.signal;

    const getOrdersForNextPage = async () => {
      if (auth.user != null) {
        const fetchedOrders: orderWithOrderItems [] = await getOrdersByUserId({
          userId: auth.user.userId,
          limit,
          offset: page * limit
        }, signal);
        setOrdersForNextPage(fetchedOrders);
      }
    }
    getOrdersForNextPage();
    return () => controller.abort();

  }, [auth.user, page]);

  //Fetch payment methods on mount
  useEffect(() => {
    const controller = new AbortController;
    const signal: AbortSignal = controller.signal;

    const getPaymentMethods = async () => {
      setPaymentMethods(await fetchPaymentMethods(signal));
    }
    getPaymentMethods();

    return () => controller.abort();
  }, [page]);

  //Fetch order statuses on mount
  useEffect(() => {
    const controller = new AbortController;
    const signal: AbortSignal = controller.signal;

    const getOrderStatuses = async () => {
      setOrderStatuses(await fetchOrderStatuses(signal));
    }
    getOrderStatuses();

    return () => controller.abort();
  }, [page]);

  const handlePagination = () => {
    const newOrdersArray: OrderWithOrderItems[] = [...orders, ...ordersForNextPage];
    const groupedOrders: GroupedOrders[] = groupOrdersByDate(newOrdersArray);

    setGroupedOrders(groupedOrders);
    setOrders(newOrdersArray);
    setPage(prevPage => prevPage + 1);
  }

  return (
    <main className="bg-gray-50">
      <PageHeader title="Your Orders" description="Keep track of all your delicious purchases in one place."/>
      <div className="container mx-auto px-4 py-8">
        {groupedOrders.length > 0 ? (
          groupedOrders.map((groupedOrder: GroupedOrders) => (
            <Card className="mb-8 overflow-hidden bg-white" key={groupedOrder.date}>
              <CardHeader className="bg-pink-50">
                <CardTitle className="text-xl font-semibold text-pink-600">
                  {groupedOrder.date}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {groupedOrder.orders.map((order: orderWithOrderItems) => (
                  <div key={order.orderId}>
                    <CardContent className="p-4">
                      <OrderCard
                        order={order}
                        reviews={reviews.filter(r => order.orderItems.some(i => i.bakeId == r.bakeId))}
                        paymentMethod={paymentMethods.find(pm => pm.id === order.paymentMethodId)
                          ?? {id: 0, method: "Unknown"}}
                        orderStatus={orderStatuses.find(os => os.id === order.orderStatusId)
                          ?? {id: 0, status: "Unknown"}}
                      />
                    </CardContent>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="text-center p-8 bg-white">
            <CardContent>
              <p className="text-lg text-gray-600">You have no orders yet.</p>
              <p className="mt-2 text-pink-600">Time to treat yourself to some delicious bakes!</p>
            </CardContent>
          </Card>
        )}
        {ordersForNextPage.length > 0 && (
          <div className="flex">
            <Button className="m-auto bg-pink-700 hover:bg-pink-800" onClick={handlePagination}>
              Load more
            </Button>
          </div>
        )}
      </div>
    </main>
  )
}
