export default interface Review {
    userId: string,
    bakeId: number,
    title: string,
    feedback: string,
    rating: number
    createDateTime: Date,
    formattedDate? : string,
}