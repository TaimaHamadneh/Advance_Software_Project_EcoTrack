const mongoose = require("mongoose");
const joi = require('joi');

const EnvironmentalDataSchema = new mongoose.Schema({
    location: {
        type: String,
        required: true,
        trim: true,
        minlength:3,
        maxlength:200,
    },
    temperature: {
        type: Number,
        description: "Temperature measurement in degrees Celsius"
      },
      humidity: {
        type: Number,
        description: "Humidity measurement as a percentage"
      },
      waterQuality: {
            type: Number,
            description: "pH level of water";
        location:joi.string().trim().min(3).max(200).required(),
        temperature:joi.number().required(),
        humidity:joi.number().required(),
        waterQuality:joi.number().required(),
       });
   
       return schema.validate(obj);
}

//validate update EnvironmentalData
function validateupdateEnvironmentalData(obj){
    const schema = joi.object({
        location:joi.string().trim().min(3).max(200),
        temperature:joi.number(),
        humidity:joi.number(),
        waterQuality:joi.number(),
       });
   
       return schema.validate(obj);
}


module.exports= {
    EnvironmentalData,
    validatecreateEnvironmentalData,
    validateupdateEnvironmentalData,
}