const UserRoutes = require('./UserRoutes')
const ProductRoutes = require('./ProductRoutes')
const OrderRoutes = require('./OrderRoutes')

const routes = (app) => {
    app.use('/api/user', UserRoutes)
    app.use('/api/product', ProductRoutes)
    app.use('/api/order', OrderRoutes)
}

module.exports = routes