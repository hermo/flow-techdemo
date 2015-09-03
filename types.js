type CartItem = {
    pid: number,
    id: string,
    qty: number,
    name: string,
    price: number
}

type OrderInfo = {
    id: number,
    message: string
}

type OrderCart = Array<CartItem>

type ProductStockItem = {
    warehouse: string,
    quantity: number
}

type OrderAvailability = {
    status: string,
    stock: Array<ProductStockItem>
}

type Order = {
    info: OrderInfo,
    cart: OrderCart,
    availability: OrderAvailability,
    total: number
}

type LoadError = {
    status: number,
    err: string
}

type callback<T> = (x: T) => void


