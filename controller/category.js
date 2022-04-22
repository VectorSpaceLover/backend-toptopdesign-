const Categories = require('../model/Categories');

const getCategories = async (req, res) => {
    const categories = await Categories.find({});
    res.status(200).json(categories);
}

const addCategory = async (req, res) => {
    const {
        name,
    } = req.body;

    const isExist = await Categories.find({name:{$regex: name, $options: 'i'}});
    
    if(isExist && isExist.length > 1)
        res.status(202).json({message: `${name} is already existed`});
    else{
        const newCategory = new Categories({
            name,
            tags: [],
        })
        await newCategory.save();
        const categories = await Categories.find({});
        res.status(200).json(categories);
    }
}

const getTagsById = async (req, res) => {
    const {
        id, 
    } = req.query;
    const category = await Categories.findById(id);
    if(category){
        res.status(200).json(category);
    }else{
        res.status(404).send({ message: 'something error' })
    }
}

const getAllTags = async(req, res) => {
    const all = await Categories.find({});
    let results = [];
    all.forEach((item) => {
        item?.tags?.forEach((val) => {
            if(!results.includes(val))
                results.push(val.tagName);
        })
    })
    res.status(200).json(results);
}

const addNewTagToCategory = async (req, res) => {
    const { id } = req.params;
    const {
        tagName,
        count
    } = req.body;
    const category = await Categories.findById(id);
    if(!category){
        return res.status(404).send({
            message: `category with ID: ${id} does not exist in database.`,
        });
    }
    category.tags.push({tagName, count});
    await category.save();
    res.status(200).json(category);
}

const updateTagToCategory = async (req, res) => {
    const { id } = req.params;
    const {
        tags,
    } = req.body;
    
    const category = await Categories.findById(id);
    if(!category){
        return res.status(404).send({
            message: `category with ID: ${id} does not exist in database.`,
        });
    }
    category.tags = tags;
    await category.save();
    res.status(200).json(category);
}

const deleteCategories = async () => {
    await Categories.remove({});
}
module.exports = {
    getCategories,
    addCategory,
    getTagsById,
    addNewTagToCategory,
    updateTagToCategory,
    deleteCategories,
    getAllTags
};