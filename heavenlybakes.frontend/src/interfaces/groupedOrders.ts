import OrderWithOrderItems from "@/interfaces/orderWithOrderItems";

export default interface GroupedOrders {
    date : string,
    orders : OrderWithOrderItems[],
}