const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const {User,validateupdate}= require("../models/User");
const {EnvironmentalData,validatecreateEnvironmentalData,validateupdateEnvironmentalData} =require("../models/EnvironmentalData");
const {verifyTokenAndAdmin} =require("../middlewares/verifyToken");
const {sendThresholdEmail} = require("../models/Sendemail");




 /**
  * @desc   get all EnvironmentalData
  * @route  /api/environmental
  * @method GET
  * @access public
  */
 
 router.get("/" , asyncHandler(
  async(req,res) => {
    const {pageNumber} = req.query;
    const perpage=2;
    const environmentalList = await EnvironmentalData.find()
    .skip((pageNumber - 1)*perpage).limit(perpage);//in each page there is 2 authors
    res.status(200).json(environmentalList);
    }
 ));



  /**
  * @desc   get EnvironmentalData by id
  * @route  /api/environmental/:id
  * @method GET
  * @access public
  */

 router.get("/:id" ,asyncHandler( async(req,res) => {
   
      const environmentals = await EnvironmentalData.findById(req.params.id);
      if(environmentals){
         res.status(200).json(environmentals);
      }else{
         res.status(404).json({message: "environmentals not found"});
      }
    }
    )

);

 /**
  * @desc   creat new EnvironmentalData
  * @route  /api/environmental
  * @method POST
  * @access private(only Admin)
  */

router.post("/",verifyTokenAndAdmin,
asyncHandler(
    async(req,res) => {
      
        const {error} = validatecreateEnvironmentalData(req.body);
      
          if(error){
              return res.status(400).json({message: error.details[0].message});
          }
      
          
              const environmentals =new EnvironmentalData({
                location:req.body.location,
                temperature:req.body.temperature,
                humidity:req.body.humidity,
                waterQuality:req.body.waterQuality,
              });
             const result =await environmentals.save();
             
             

    // Check if the environmental data exceeds user thresholds
    const users = await User.find({ location: req.body.location, threshold: { $lt: req.body.temperature } });
             


    // Update user schema with notifications
    users.forEach(async (user) => {
        if (!user.notifications) {
            user.notifications = [];
        }

        user.notifications.push({
            message: The temperature threshold at ${req.body.location} is now greater than your configured threshold.,
            
            timestamp: new Date(),
        });
        sendThresholdEmail(user.email, req.body.location);

        await user.save();
    });
            
              
              res.status(201).json(result);//201 means created successfully
            }       
)

    
);



 /**
  * @desc   update a EnvironmentalData 
  * @route  /api/environmental/:id
  * @method PUT
  * @access private
  */

router.put("/:id",verifyTokenAndAdmin,
asyncHandler (
    async(req,res) => {
        //validation
    const {error} = validateupdateEnvironmentalData(req.body);
    
    if(error){
        return res.status(400).json({message: error.details[0].message});
    }
    
    
        const environmentals= await EnvironmentalData.findByIdAndUpdate(req.params.id, {
            $set: {
                location:req.body.location,
                temperature:req.body.temperature,
                humidity:req.body.humidity,
                waterQuality:req.body.waterQuality,
            },
        },
        {new:true}
        );
       // res.status(200).json(environmentals)
       const result =await environmentals.save();

        //here
         // Check if the environmental data exceeds user thresholds
    const users = await User.find({ location: req.body.location, threshold: { $lt: req.body.temperature } });
             


    // Update user schema with notifications
    users.forEach(async (user) => {
        if (!user.notifications) {
            user.notifications = [];
        }

        user.notifications.push({
            message: The temperature threshold at ${req.body.location} is now greater than your configured threshold.,
            
            timestamp: new Date(),
        });
        sendThresholdEmail(user.email, req.body.location);

        await user.save();
    });
            
              
              res.status(201).json(result);//201 means created successfully
            }       

  
    
     
));



  /**
  * @desc   delete a EnvironmentalData 
  * @route  /api/environmental/:id
  * @method DELETE
  * @access private
  */

  router.delete("/:id",verifyTokenAndAdmin,
  asyncHandler(
    async(req,res) => {
        
         const environmentals= await EnvironmentalData.findById(req.params.id);
         
         if(environmentals){
             await EnvironmentalData.findByIdAndDelete(req.params.id);
             res.status(200).json({message: "EnvironmentalData has been deleted"});
         }else{
             res.status(404).json({message: "EnvironmentalData not found"}); 
         }
        
         
          }
  ));



module.exports = router;
