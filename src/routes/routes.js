const {
  craeteProduct,
  getProductById,
  getActiveProducts,
  updateProductById,
  deleteProductById,
} = require("../controller/productController");
const { upload } = require("../helpers/helpers");

const router = require("express").Router();

router.post("/products", upload.single("productImage"), craeteProduct);
router.get("/products/productId/:id", getProductById);
router.get("/products/active", getActiveProducts);
router.put("/products/productid/:id", upload.single("productImage"), updateProductById)
router.delete("/products/productid/:id",deleteProductById)

module.exports = router;
