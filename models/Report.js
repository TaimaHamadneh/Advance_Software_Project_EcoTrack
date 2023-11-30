const { boolean } = require("joi");
const mongoose = require("mongoose");
const joi = require('joi');
const jwt = require("jsonwebtoken");

//Report schema
const ReportSchema = new mongoose.Schema({
    Type:{
    type: String, 
    required: true,
    enum: ["pollution", "deforestation", "wildlife_endangerment"],
    },
    location:{
        type: String, 
        required: true,
        trim: true,
        minlength: 2,
        maxlength:100,
    },
     description:{
        type: String, 
        required: true,
        trim: true,
        minlength: 6,
        },
   
    media :{
        type: String, // Assuming a URL or file path
        },
    userId: {
            type: String,
            required: true,   
        },
      
  
}, {timestamps: true});




//report model
const Report = mongoose.model("Report" , ReportSchema);

//validate create Report
function validatecreateReport(obj){
    const schema = joi.object({
        Type: joi.string().valid("pollution", "deforestation", "wildlife_endangerment").required(),
        location: joi.string().trim().min(2).max(100).required(),
        description: joi.string().trim().min(6).required(),
        media: joi.string(),
        userId: joi.string().required(),
       });
   
       return schema.validate(obj);
}

//validate update Report
function validateupdateReport(obj){
    const schema = joi.object({
        Type: joi.string().valid("pollution", "deforestation", "wildlife_endangerment"),
        location: joi.string().trim().min(2).max(100),
        description: joi.string().trim().min(6),
        media: joi.string(),
        userId: joi.string(),
        
       });
   
       return schema.validate(obj);
}


module.exports={
    Report,
    validatecreateReport,
    validateupdateReport,
    
};