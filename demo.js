/* @flow */

import type {
    CartItem, callback, LoadError, OrderCart,
    OrderInfo, Order, OrderAvailability
} from './types'

// Generate dummy cart item
function genCartItem():CartItem {
    var pid = ~~(Math.random() * 99999),
        id = (1000 + ~~(Math.random() * 9999)).toString(),
        name = `Product ${id}`,
        qty = 1 + ~~(Math.random() * 5),
        price = (200 + ~~(Math.random() * 50000))/100
    return { pid, id, name, qty, price }
}

// Generate dummy cart
function genCart():Array<CartItem> {
    var out = [],
        size = 1 + ~~(Math.random() * 5)

    for (var i=0; i < size; i++) {
        out.push(genCartItem())
    }
    return out
}

// Load order info from backend
function loadOrderInfo(orderId):Promise<OrderInfo> {
    console.log('load order...')
    return new Promise((resolve:callback<OrderInfo>, reject:callback<LoadError>) => {
        setTimeout(() => {
            if (Math.random() > 0.2)
                resolve({id: orderId, message: 'Odottaa käsittelyä'})
            else
                reject({status: 404, err: `Order ${orderId} not found`})
        }, 500)
    })
}

// Load order cart from backend
function loadOrderCart(orderId):Promise<OrderCart> {
    console.log('load cart...')
    return new Promise((resolve) => resolve(genCart()))
}

// Calculate order total from cart
function calculateOrderTotal(cart:OrderCart):number {
    return cart.reduce((total, {price, qty})  => total + price * qty, 0)
}

// Load order availability from backend
function loadOrderAvailability(orderId):Promise<OrderAvailability> {
    console.log('load availability...')
    return new Promise((resolve) => {
        resolve({
            status: 'varastossa ja myymälässä', stock: [
                { warehouse: 'js_varasto', quantity: 42 },
                { warehouse: 'js_myymala', quantity: 5 }
            ]
        })
    })
}

// Load individual order components in parallel
function loadOrderComponents(orderId):Promise<[OrderInfo, OrderCart, OrderAvailability]> {
    return Promise.all([
        loadOrderInfo(orderId),
        loadOrderCart(orderId),
        loadOrderAvailability(orderId)
    ])
}

// Combine individual order components into an Order
function combineOrderComponents([orderInfo, orderCart, orderAvailability]):Order {
    return {
        info: orderInfo,
        cart: orderCart,
        availability: orderAvailability,
        total: calculateOrderTotal(orderCart)
    }
}
// Load order
function loadOrder(orderId):Promise<Order> {
    return loadOrderComponents(orderId).then(combineOrderComponents)
}

// Print out order breakdown
function printOrderBreakdown(order:Order) {
    console.dir(order.cart)
    console.log('order total: ', order.total)
    console.log('order availability: ', order.availability.status)
}

function handleLoadError({status, err}:LoadError) {
    console.log("Load failed:", status, err)
}

loadOrder(123456)
    .then(printOrderBreakdown)
    .catch(handleLoadError)
