const router = require('express').Router();
const { json } = require('express/lib/response');
const mongoose = require('mongoose');

const {
    getProducts,
    searchProducts,
    getSearchResultsByCategory,
    createNewProduct,
    getProductById,
    getProductByName,
    getProductsByName,
    deleteProductById,
    deleteProducts,
    addLikedProduct,
    addViewedProduct,
    getYearlyProducts,
    getMonthlyProducts,
    getDailyProducts,
    getTopProducts,
    getAllProducts,
    getNewProducts,
    getAllNewProducts,
    uploadProductImage,
    upDateProduct,
    getComplexResults,
} = require('../controller/products');

router.get('/', getProducts);
router.get('/detail', getProductById);
router.get('/byname', getProductsByName);
router.get('/search', searchProducts);
router.get('/category/search', getSearchResultsByCategory);
router.get('/yearly', getYearlyProducts);
router.get('/monthly', getMonthlyProducts);
router.get('/daily', getDailyProducts);
router.get('/top', getTopProducts);
router.get('/all', getAllProducts);
router.get('/new', getNewProducts);
router.get('/new/all', getAllNewProducts);

router.post('/detail', getProductByName);
router.post('/create', createNewProduct);
router.post('/upload', uploadProductImage);
router.post('/add/liked', addLikedProduct);
router.post('/add/viewed', addViewedProduct);
router.post('/complex', getComplexResults);

router.delete('/:id', deleteProductById);
router.delete('/', deleteProducts);

router.put('/:id', upDateProduct);

module.exports = router;
