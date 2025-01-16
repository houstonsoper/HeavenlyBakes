export default interface Review {
    customerId: string,
    bakeId: number,
    title: string,
    feedback: string,
    rating: number
    createDateTime: Date,
    formattedDate? : string,
}