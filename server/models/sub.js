const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema;

const subSchema = new mongoose.Schema({
    name : {
        type : String,
        trim : true,
        required : 'Name is Required',
        minlength : [3, 'Too Short'],
        maxlength : [32, 'Too longs']
    },
    //slugh looks like lowercase trim remove white space
    slug:{
        type : String,
        lowercase : true,
        unique : true,
        index : true
 
    },
    parent:{type : ObjectId, ref:"Category", required : true },

},{timestamps : true}
)

module.exports = mongoose.model('Sub', subSchema)