const mongoose = require("mongoose");
const joi = require('joi');

//Resources Schema
const ResourcesSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true,
    trim: true,
    minlength:3,
    maxlength:250
  },
  publisher:{
    type: String,
    required: true,
   
  },
  description:{
    type: String,
    required: true,
    trim: true,
    minlength:5,
  },
 
},{
timestamps:true
});

//Resources Model
const Resources = mongoose.model("Resources",ResourcesSchema);


//validate create Resources
function validatecreateResources(obj){
    const schema = joi.object({
        title: joi.string().trim().min(3).max(250).required(),
        publisher: joi.string().required(),
        description: joi.string().trim().min(5).required(),
       
       });
   
       return schema.validate(obj);
}

//validate update Resources
function validateupdateResources(obj){
    const schema = joi.object({
        title: joi.string().trim().min(3).max(250),
        publisher: joi.string(),
        description: joi.string().trim().min(5),
        
       });
   
       return schema.validate(obj);
}


module.exports={
    Resources,
    validatecreateResources,
    validateupdateResources,
}