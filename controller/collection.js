const Collection = require('../model/Collections');
const Users = require('../model/Users');

const createNewCollection = async (req, res) => {
    const {
        collectionName,
        description,
        author,
        count,
    } = req.body;

    const newCollection = new Collection({
        collectionName,
        description,
        author,
        count,
        isActive: false,
    })
    const savedCollection = await newCollection.save();
    res.status(200).json(savedCollection);
}

const getCollections = async (req, res) => {
    Collection.find({})
    .populate('author')
    .exec(function(err, result) {
        if(err){
            res.status(404).json({message: 'something went wrong'});
        }else{
            return res.send({
                collections: result,
            });
        }
    });
}

const getAllCollectionByUserId = async (req, res) => {
    const { id } = req.query;

    Collection.find({})
    .populate('author')
    .exec(function(err, result) {
        if(err){
            res.status(404).json({message: 'something went wrong'});
        }else{

            const resTmp = result.filter(item => {
                return (item?.author?._id)?.toString() == id.toString();
            })
            res.status(200).json(resTmp);
        }
    });
}

const searchCollections = async (req, res) => {
    const { keyword } = req.query;
    await Collection.find({collectionName:{$regex: keyword, $options: 'i'}})
    .populate('author')
    .exec(function(err, result) {
        if(err){
            res.status(404).json({message: 'something went wrong'});
        }else{
            res.status(200).json(result)
        }
    });
}

const getCollectionByUserName = async (req, res) => {
    const { keyword } = req.query;
    await Collection.find({})
    .populate('author')
    .exec(function(err, result) {
        if(err){
            res.status(404).json({message: 'something went wrong'});
        }else{
            const resTmp = result.filter(item => {
                const userName = item?.author?.userName;
                return userName?.toLowerCase() == keyword.toLowerCase() || keyword.toLowerCase() === item.collectionName;
            })
            res.status(200).json(resTmp)
        }
    });
}

const getCollectionById = async (req, res) => {
    const { id } = req.query;
    await Collection.findById(id)
    .populate('author')
    .exec(function(err, result) {
        if(err){
            res.status(404).json({message: 'something went wrong'});
        }else{
            res.status(200).json(result)
        }
    });
}

const deleteCollectionById = async (req, res) => {
    const { id } = req.params;
    const collection = await Collection.findById(id);
    if (!collection) {
        return res.status(404).send({
          message: `Collection with ID: ${id} does not exist in database.`,
        });
    }
    await Collection.findByIdAndDelete(id);
    return res.send({
        status: 'ok',
        deletedId: id,
    });
}

const upDateCollection = async (req, res) => {
    const { id } = req.params;
    const {
        collectionName,
        description,
    } = req.body;
    
    const collection = await Collection.findById(id);
    if(!collection){
        return res.status(404).send({
            message: `Collection with ID: ${id} does not exist in database.`,
        });
    }

    collection.updatedAt = Date.now();
    collection.collectionName = collectionName;
    collection.description = description;

    const savedCollection = await collection.save();
    return res.send({
        status: 'ok',
        collection: savedCollection,
    });
}

const getActiveCollections = async (req, res) => {
    const query = { isActive: true };
    const sort = { createdDate: 1 };
    await Collection.find(query).sort(sort)
    .populate('author')
    .exec(function(err, result) {
        if(err){
            res.status(404).json({message: 'something went wrong'});
        }else{
            res.status(200).json(result);
        }
    });
}

const getSuspendedCollections = async (req, res) => {
    const query = { isActive: false };
    const sort = { createdDate: 1 };
    await Collection.find(query).sort(sort)
    .populate('author')
    .exec(function(err, result) {
        if(err){
            res.status(404).json({message: 'something went wrong'});
        }else{
            res.status(200).json(result);
        }
    });
}

const suspendByIds = async (req, res) => {
    const { ids } = req.body;
    await ids.forEach(async(item) => {
        const collection = await Collection.findById(item._id);
        collection.isActive = false;
        await collection.save()
    })
    res.status(200).json();
}

const unSuspendByIds = async (req, res) => {
    const { ids } = req.body;
    await ids.forEach(async(item) => {
        const collection = await Collection.findById(item._id);
        collection.isActive = true;
        await collection.save()
    })
    res.status(200).json();
}

module.exports = {
    getCollections,
    getAllCollectionByUserId,
    getCollectionById,
    createNewCollection,
    deleteCollectionById,
    upDateCollection,
    searchCollections,
    getCollectionByUserName,
    getActiveCollections,
    getSuspendedCollections,
    suspendByIds,
    unSuspendByIds,
};
  