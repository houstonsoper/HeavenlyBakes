export default interface Bake {
    id: number,
    name: string,
    basePrice: number,
    type: string,
    imageUrl: string,
    description: string,
    rating: number,
    stock: number,
    discount: number,
    price: number,
    inProduction: boolean,
}