/* @flow */

import type {
    CartItem, callback, LoadError, OrderCart,
    OrderInfo, Order, ProductAvailability
} from './types'

import I from 'immutable'

// Generate dummy cart item
function genCartItem():CartItem {
    var pid = ~~(Math.random() * 99999),
        id = (1000 + ~~(Math.random() * 9999)).toString(),
        name = `Product ${id}`,
        qty = 1 + ~~(Math.random() * 5),
        price = (200 + ~~(Math.random() * 50000))/100
    return I.Map({ pid, id, name, qty, price })
}


// Generate dummy cart
function genCart():OrderCart {
    return I.Range(1, 1 + ~~(Math.random() * 5))
        .map(genCartItem)
        .toList()
}

// Load order info from backend
function loadOrderInfo(orderId):Promise<OrderInfo> {
    console.log('load order...')
    return new Promise((resolve:callback<OrderInfo>, reject:callback<LoadError>) => {
        setTimeout(() => {
            if (Math.random() > 0.2)
                resolve(I.Map({id: orderId, message: 'Odottaa käsittelyä'}))
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
    return cart.reduce((total, item)  => total + item.get('price') * item.get('qty'), 0)
}

// Load order availability from backend
function loadProductAvailability(pid):Promise<ProductAvailability> {
    console.log('load availability...', pid)
    return new Promise((resolve) => {
        resolve(I.fromJS({
            status: 'varastossa ja myymälässä', stock: [
                { warehouse: 'js_varasto', quantity: 1 + ~~(Math.random() * 10) },
                { warehouse: 'js_myymala', quantity: 1 + ~~(Math.random() * 10) }
            ]
        }))
    })
}

// Load individual order components in parallel
function loadOrderComponents(orderId):Promise<[OrderInfo, OrderCart, ProductAvailability]> {
    return Promise.all([
        loadOrderInfo(orderId),
        loadOrderCart(orderId),
        loadProductAvailability(orderId)
    ])
}

// Combine individual order components into an Order
function combineOrderComponents([orderInfo, orderCart, orderAvailability]):Order {
    return I.Map({
        info: orderInfo,
        cart: orderCart,
        availability: orderAvailability,
        total: calculateOrderTotal(orderCart)
    })
}
// Load order
function loadOrder(orderId):Promise<Order> {
    return loadOrderComponents(orderId).then(combineOrderComponents)
}

// Print out order breakdown
function printOrderBreakdown(order:Order) {
    // FIXME: flow should complain about not checking that order.total is set
    console.log('order total: ', order.get('total'), order.total)
    console.log(order.get('cart').map((item) => {
        var i:CartItem = item.toObject()
        return `  ${i.id} (pid${i.pid}) x ${i.qty} @ ${i.price}`
    }).join("\n"))
    console.log('order availability: ', order.get('availability').get('status'))
}

function handleLoadError({status, err}:LoadError) {
    console.log("Load failed:", status, err)
}

loadOrder(123456)
    .then(printOrderBreakdown)
    .catch(handleLoadError)
