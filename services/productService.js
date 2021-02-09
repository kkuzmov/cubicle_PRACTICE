// const uniqid = require('uniqid'); // библиотека за генериране на уникално ID, няма да е част от exam package, защото mongo генерира свои id
const Cube = require('../models/cube'); // модел за клас Cube - отпада от exam package заради mongo schema
const Accessory = require('../models/accessory');

async function getAll(query){
    // let products = productData.getAll()
    // let products = Cube.getAll();
    let products = await Cube.find({}).lean();
    if(query.search){
        products = products.filter(x => x.name.toLowerCase().includes(query.search))
    }
    if(query.from){
        products = products.filter(x => Number(x.level) >= query.from);
    }
    if(query.to){
        products = products.filter(x => Number(x.level) <= query.to);
    }
    return products;
}
async function getOne(id){
    return Cube.findById(id).lean();
}
function createCube(data, userId){
    let cube = new Cube({...data, creator: userId});

    return cube.save()
}
async function attachAccessory(productId, accessoryId){
    let product = await Cube.findById(productId)
    let accessory = await Accessory.findById(accessoryId)
    product.accessories.push(accessory);
    return product.save()
}
function getOneWithAccessories(id){
    return Cube.findById(id).populate('accessories').lean();
}
function updateOne(productId, productData){
   return Cube.updateOne({_id: productId}, productData)
}
function deleteOne(productId){
    return Cube.deleteOne({_id: productId})
}
module.exports = {
    getAll,
    getOne,
    createCube,
    attachAccessory,
    getOneWithAccessories,
    updateOne,
    deleteOne
}