const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminPost = new Schema({
    email:String,
    password:String,
});

const admonDo=mongoose.model("admin",AdminPost)
module.exports=admonDo