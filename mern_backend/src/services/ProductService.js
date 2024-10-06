const Product = require("../models/ProductModel")



const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        try {
        const {name, image, type, countInStock, price, rating, description} = newProduct
            const checkProduct = await Product.findOne({name})
            if(checkProduct) { 
                reject({message: "Product already exists", status: 400})
            }
            const createProduct = await Product.create({
                name, image, type, countInStock, price, rating, description
            })
            if(createProduct){
                resolve({
                    status: 'OK',
                    message: "SUCCESS",
                    data:  createProduct

                })
            }
        } catch (e) {
            reject(e)
        }

    })
}

const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({ _id: id });
            if (checkProduct === null) {
                reject({ message: "Product not found", status: 400 });
            }

            await Product.updateOne({ _id: id }, { $set: data });

            const updatedProduct = await Product.findOne({ _id: id });

            resolve({
                status: 'OK',
                message: "SUCCESS",
                data: updatedProduct
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getDetailsProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({ _id: id });
            if (checkProduct === null) {
                reject({ message: "Product not found", status: 400 });
            }
            resolve({
                status: 'OK',
                message: "SUCCESS",
                data: checkProduct
            });
        } catch (e) {
            reject(e);
        }
    });
};

const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({ _id: id });
            if (checkProduct === null) {
                reject({ message: "Product not found", status: 400 });
            }

            await  Product.deleteOne({ _id: id });

            resolve({
                status: 'OK',
                message: "Delete product success",
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getAllProduct = () => {
    return new Promise(async (resolve, reject) => {
        try {
            //const checkUser = await User.findOne({ _id: id })
            const allProduct =  await Product.find().sort({ createdAt: -1 });
            resolve  ({
                status: 'OK',
                message: 'SUCCESS',
                data: allProduct
            })
            
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct
}