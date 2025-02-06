const express = require('express');
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require('../controller/productController');
const upload = require('../uploads/upload'); // Import multer upload settings

const router = express.Router();

// Add file upload middleware
router.post('/', upload.single('images'), createProduct); // Handle file upload

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
