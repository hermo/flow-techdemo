import I from 'immutable'

type CartItem = I.Map<{
    pid: number,
    id: string,
    qty: number,
    name: string,
    price: number
}>

type OrderInfo = I.Map<{
    id: number,
    message: string
}>

type OrderCart = I.List<CartItem>

type ProductStockItem = I.Map<{
    warehouse: string,
    quantity: number
}>

type ProductAvailability = I.Map<{
    status: string,
    stock: List<ProductStockItem>
}>

type Order = I.Map<{
    info: OrderInfo,
    cart: OrderCart,
    availability: OrderAvailability,
    total?: number
}>

type LoadError = {
    status: number,
    err: string
}

type callback<T> = (x: T) => void


