const router = require('express').Router();

const {
    getCategories,
    addCategory,
    getTagsById,
    addNewTagToCategory,
    updateTagToCategory,
    deleteCategories,
    getAllTags
} = require('../controller/category');

router.get('/', getCategories);
router.get('/detail', getTagsById);
router.get('/tags/all', getAllTags);

router.post('/create', addCategory);

router.put('/tag/add/:id', addNewTagToCategory);
router.put('/tag/delete/:id', updateTagToCategory);

router.delete('/', deleteCategories);

module.exports = router;
