const orderHelper = require('../../models/user/order')

module.exports = {
    orderList: async (req, res) => {
        let orders = await orderHelper.getUserOrders(req.session.user._id)
        res.render('user/order-list', { orders, usersi: true })
    },
    viewOrder: async (req, res) => {
        try {
            let products = await orderHelper.getOrderProduct(req.params.id)
            let cartCount = await orderHelper.cartCount(req.session.user._id)
            res.render('user/view-order', { products, usersi: true, cartCount })
        } catch (err) {
            res.render('404')
        }
    }
    ,
    cancelOrder: (req, res) => {
        let orderId = req.params.id
        orderHelper.cancelOrder(orderId).then((order) => {
            res.json(order.status)
        })
    },
    returnOrder: (req, res) => {
        orderHelper.returnOrder(req.params.id).then(() => {
            res.json({ status: true })
        })
    }
}