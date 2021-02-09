// CHECK NAMES/PARAMETERS


const Accessory = require('../models/accessory');

function create(data){
let accessory = new Accessory(data);

return accessory.save()
}
function getAll(){
    return Accessory.find().lean();
}
function getAllWithout(ids){
    return Accessory.find({_id: {$nin: ids }}).lean()
}

module.exports = {
    create,
    getAllWithout,
    getAll,
}