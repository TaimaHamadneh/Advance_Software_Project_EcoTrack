const {Resources} = require("./models/Resources");
const {EnvironmentalData} = require("./models/EnvironmentalData");
const {resources,environmental} = require("./data");
const connectToDB = require("./config/db");
require("dotenv").config();
const mongoose = require('mongoose');


//connection to DataBase 
connectToDB();

//seeding database

//Import environmental
const importenvironmental = async () => {
    try{
        await EnvironmentalData.insertMany(environmental);
        console.log('Data Imported Successfully');
    }catch (error){
        console.log(error);
        process.exit(1);//Disconnect to db
    }
}


//Remove environmental
const removeenvironmental = async () => {
    try{
        await EnvironmentalData.deleteMany();
        console.log('Data Removed');
    }catch (error){
        console.log(error);
        process.exit(1);//Disconnect to db
    }
}


//Import resources
const importresources = async () => {
    try{
        await Resources.insertMany(resources);
        console.log('Data Imported Successfully');
    }catch (error){
        console.log(error);
        process.exit(1);//Disconnect to db
    }
}

if(process.argv[2] === "-import"){
    importenvironmental();
}else if(process.argv[2] === "-remove"){
    removeenvironmental();
}else if(process.argv[2] === "-import-resources"){
    importresources();
}