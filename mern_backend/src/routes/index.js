const UserRoutes = require('./UserRoutes')
const ProductRoutes = require('./ProductRoutes')
const OrderRoutes = require('./OrderRoutes')
const PaymentRoutes = require('./PaymentRoutes')
const routes = (app) => {
    app.use('/api/user', UserRoutes)
    app.use('/api/product', ProductRoutes)
    app.use('/api/order', OrderRoutes)
    app.use('/api/payment', PaymentRoutes)
}

module.exports = routes