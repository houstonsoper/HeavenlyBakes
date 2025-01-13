export default interface Review {
    id: number,
    customerId: string,
    bakeId: number,
    title: string,
    feedback: string,
    rating: number
    createDateTime: Date,
    formattedDate? : string,
}