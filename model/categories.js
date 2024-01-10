const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategoryPost = new Schema({
    image:String,
    title: String
});

const categoryDo=mongoose.model("categories",CategoryPost)
module.exports=categoryDo