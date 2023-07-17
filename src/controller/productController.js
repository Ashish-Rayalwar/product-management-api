const path = require("path");
const {
  upload,
  getData,
  createData,
  emptyData,
} = require("../helpers/helpers");

const database = path.join(__dirname, "../products.json");
const fs = require("fs");
const craeteProduct = async (req, res) => {
  try {
    const data = req.body;
    const { productName, productDescription, isActive } = data;
    const productImage = req.file ? req.file.filename : "";

    const database = getData();
    console.log(database);
    const product = {
      productId: database.length + 1,
      productName,
      productDescription,
      productImage,
      isActive,
    };

    createData([product]);

    return res
      .status(201)
      .json({ status: true, message: "Product created", data: product });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const data = getData();
    const product = data.find((x) => x.productId == productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found.." });
    }
    return res.status(200).json({ status: true, data: product });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getActiveProducts = async (req, res) => {
  try {
    const page = 1;
    const limit = 10;
    const data = getData();
    const activeProducts = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].isActive == "true") {
        console.log(data[i]);
        activeProducts.push(data[i]);
      }
    }

    if (activeProducts.length === 0)
      return res.status(404).json({ message: "products not found" });
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    let paginatedProducts = activeProducts.slice(startIndex, endIndex);
    console.log(data);
    paginatedProducts = paginatedProducts.sort(
      (a, b) => a.productId - b.productId
    );
    const totalPages = Math.ceil(activeProducts.length / limit);

    return res.status(200).json({
      status: true,
      page,
      limit,
      totalPages,
      data: paginatedProducts,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const data = getData();
    const productImage = req.file ? req.file.filename : "";
    const product = data.find((x) => x.productId == productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    let update = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].productId != productId) {
        update.push(data[i]);
      }
    }

    product.productName = req.body.productName || product.productName;
    product.productDescription =
      req.body.productDescription || product.productDescription;
    product.isActive = req.body.isActive || product.isActive;
    product.productImage = req.file ? req.file.filename : product.productImage;
    if (productImage) {
      product.productImage = req.file
        ? req.file.filename
        : data[product].productImage;
    }

    update.push(product);

    const arr = [];
    fs.writeFileSync(database, JSON.stringify(arr));
    update = update.sort((a, b) => a.productId - b.productId);
    createData(update);

    return res
      .status(200)
      .json({ status: true, message: "Product updated", data: product });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const data = getData();

    const product = data.filter((x) => x.productId == productId);

    if (product.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    const deleteProduct = data.filter((x) => x.productId != productId);
    const arr = [];
    fs.writeFileSync(database, JSON.stringify(arr));
    createData(deleteProduct);

    return res.status(200).json({ status: true, message: "Product deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  craeteProduct,
  getProductById,
  getActiveProducts,
  updateProductById,
  deleteProductById,
};
