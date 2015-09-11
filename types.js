/* @flow */
export type CartItem = {
    pid: number,
    id: string,
    qty: number,
    name: string,
    price: number
}

export type OrderInfo = {
    id: number,
    message: string
}

export type OrderCart = Array<CartItem>

export type ProductStockItem = {
    warehouse: string,
    quantity: number
}

export type OrderAvailability = {
    status: string,
    stock: Array<ProductStockItem>
}

export type Order = {
    info: OrderInfo,
    cart: OrderCart,
    availability: OrderAvailability,
    total?: number
}

export type LoadError = {
    status: number,
    err: string
}

export type callback<T> = (x: T) => void

