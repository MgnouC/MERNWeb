const mongoose = require('mongoose')
const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        isAdmin: {type: Boolean, default: false, required: true},
        phone:  {type: Number, required: true},
        access_token:{ type: String},
        refresh_token:{ type: String},
    },
    {timestamps: true}
);

const User = mongoose.model("User", userSchema);
module.exports = User;