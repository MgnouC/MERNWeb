const Product = require("../models/ProductModel");

const createProduct = (newProduct) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { name, type, price, image, description, rating, countInStock } =
        newProduct;

      // Kiểm tra nếu sản phẩm đã tồn tại
      const checkProduct = await Product.findOne({ name });
      if (checkProduct) {
        reject({ message: "Product already exists", status: 400 });
      }
      // Tạo sản phẩm mới
      const createdProduct = await Product.create({
        name,
        type,
        price,
        image,
        description,
        rating,
        countInStock,
      });
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: createdProduct,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateProduct = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({ _id: id });
      //console.log("Before Update:", checkProduct);
      await Product.updateOne({ _id: id }, { $set: data });
      const updatedProduct = await Product.findOne({ _id: id });
      resolve({
          status: "OK",
          message: "SUCCESS",
          data: updatedProduct,
      });
          } catch (e) {
      reject(e);
    }
  });
};

const getProductById = async (id) => {
  try {
    const checkProduct = await Product.findOne({ _id: id });
    // Log thông tin sản phẩm
    //console.log("Product found:", checkProduct);
    if (!checkProduct) {
      throw { message: "Product not found", status: 400 };
    }
    return {
      status: "OK",
      message: "SUCCESS",
      data: checkProduct,
    };
  } catch (e) {
    throw { message: e.message || "An error occurred", status: 500 };
  }
};

const deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({ _id: id });
      if (checkProduct === null) {
        reject({ message: "Product not found", status: 400 });
      }

      await Product.deleteOne({ _id: id });

      resolve({
        status: "OK",
        message: "Delete product success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllProduct = (limit, page, sort, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalProduct = await Product.countDocuments();
      if (filter) {
        const allObjectFilter = await Product.find({
          name: { $regex: filter, $options: 'i' }, // Tìm kiếm không phân biệt hoa thường
        });
        resolve({
          status: "OK",
          message: "Success",
          data: allObjectFilter,
          total: totalProduct,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalProduct / limit),
        });
      }
      

      if (sort) {
        const productsSoft = {};
        productsSoft[sort[1]] = sort[0];
        const allProductSort = await Product.find()
          .skip(page * limit)
          .limit(limit)
          .sort(productsSoft);
        const totalSoftProducts = await Product.countDocuments(productsFilter);

        resolve({
          status: "OK",
          message: "SUCCESS",
          data: allProductSort,
          total: totalSoftProducts,
          pageCurrtent: Number(page + 1),
          totalPage: Math.ceil(allProductSort / limit),
        });
      }
      const allProduct = await Product.find()
        .skip(page * limit)
        .limit(limit);
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: allProduct,
        total: totalProduct,
        pageCurrtent: Number(page + 1),
        totalPage: Math.ceil(totalProduct / limit),
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllType = () => {
  return new Promise(async (resolve, reject) => {
    try {
        const allType = await Product.distinct('type')/*.find*/
       
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: allType,
     
      });
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createProduct,
  updateProduct,
  getProductById,
  deleteProduct,
  getAllProduct,
  getAllType, 
};
