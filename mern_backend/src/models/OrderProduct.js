const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({

    orderItems: [
        {
            name: { type: String, required: true},
            amount: {type: Number, required: true},
            image: {type: String, required: true},
            price:  {type: Number, required: true},
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref:  'Product',
                required: true,
                
            },
        },
    ],
    shippingAddress: {
        fullName: { type: String, required: true},
        address: {type: String, required: true},
        city: {type: String, required: true},
        country: {type: String, required: true},
        phone: {type: Number, required: true},
    },
    paymentMethod: { type: String, required: true },
    itemPrice:  { type: Number, required: true },
    shippingPrice:   { type: Number, required: true },
    taxPrice:   { type: Number, required: true },
    totalPrice:   { type: Number, required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    user:  {type:  mongoose.Schema.Types.ObjectId, ref: 'User', require: true},
    isDelivered:  { type: Boolean, default: false },
    delieveredAt:  { type: Date },

},
    {timestamps: true,}
);

const Order = mongoose.model("User", orderSchema);
module.exports = Order;