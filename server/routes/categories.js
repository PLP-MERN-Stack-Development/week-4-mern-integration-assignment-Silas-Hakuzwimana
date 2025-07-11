const express = require('express');
const router = express.Router();
const {createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory} = require('../controllers/categoryController');

router.get('/', getAllCategories);
router.get('/:id',getCategoryById);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;
