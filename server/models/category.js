const mongoose = require('mongoose')


const categorySchema = new mongoose.Schema({
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
 
    }

},{timestamps : true}
)

module.exports = mongoose.model('Category', categorySchema)