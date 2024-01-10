const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServicePost = new Schema({
    image:String,
    title: String,
    description: String,
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"categories"
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
});

const serviceDo=mongoose.model("service",ServicePost)
module.exports=serviceDo