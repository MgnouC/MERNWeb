const Product = require("../models/ProductModel")



const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        try {
           

        const {name, type, price, image, description, rating, countInStock} = newProduct
            const checkProduct = await Product.findOne({name})
            if(checkProduct) { 
                reject({message: "Product already exists", status: 400})
            }
            const createProduct = await Product.createProduct({
                name, type, price, image, description, rating, countInStock
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

const getAllProduct = (limit,  page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalProduct =  await Product.countDocuments();
            if (filter) {
                const label = filter[0]
                const allObjectFilter = await Product.find({ [label]: {'$regex': filter[1]}})
                resolve({
                        status: 'OK',
                        message: 'Success',
                        data: allObjectFilter,
                        total: totalProduct,  // Total count from earlier
                        pageCurrent: Number(page + 1),
                        totalPage: Math.ceil(allObjectFilter / limit)
                    });
                }
            
            if(sort){
                const  productsSoft = {}
                productsSoft[sort[1]]= sort[0]
                const allProductSort =  await Product.find().skip(page * limit).limit(limit).sort(productsSoft);
                const totalSoftProducts = await Product.countDocuments(productsFilter);               

                resolve  ({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: allProductSort,
                    total:  totalSoftProducts,
                    pageCurrtent: Number(page + 1),
                    totalPage: Math.ceil(allProductSort / limit) 
                })
            }
            const allProduct =  await Product.find().skip(page * limit).limit(limit)
            resolve  ({
                status: 'OK',
                message: 'SUCCESS',
                data: allProduct,
                total:  totalProduct,
                pageCurrtent: Number(page + 1),
                totalPage: Math.ceil(totalProduct / limit) 
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