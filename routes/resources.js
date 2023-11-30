const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

const {Resources,validatecreateResources,validateupdateResources} =require("../models/Resources");
const {verifyTokenAndAdmin} =require("../middlewares/verifyToken");



 /**
  * @desc   get all Resources
  * @route  /api/resources
  * @method GET
  * @access public
  */
 
 router.get("/" , asyncHandler(async (req,res) => {
    //comparioson query operators
    //$in : [8,9] //$nin //$eq //$ne //$lt //$lte //$gt //$gte 
    
    
    const {Title} =req.query;
    let resources;
    if(Title){
        resources=await Resources.find({title: {$eq:Title}});
       // .populate("author", ["_id","firstname","lastname"]);
    }else {
        resources=await Resources.find();
       // .populate("author", ["_id","firstname","lastname"]); 
    }
    
    res.status(200).json(resources);
 }));

  /**
  * @desc   get Resources by id
  * @route  /api/resources/:id
  * @method GET
  * @access public
  */

 router.get("/:id" , asyncHandler(async (req,res) => {
   const resource = await Resources.findById(req.params.id);
   //.populate("author");
 if(resource){
    res.status(200).json(resource);
 }else{
    res.status(404).json({message: "Resource not found"});
 }

}));

 /**
  * @desc   creat new Resources
  * @route  /api/resources
  * @method POST
  * @access private
  */

router.post("/",verifyTokenAndAdmin,
 asyncHandler(async(req,res) => {
     
  const {error} = validatecreateResources(req.body);

    if(error){
        return res.status(400).json({message: error.details[0].message});

    }

    const resource = new Resources({  
        title:req.body.title,
        publisher:req.body.publisher,
        description:req.body.description,
        
    });

   const result= await resource.save();
    res.status(201).json(result);//201 means created successfully
}));

 /**
  * @desc   update a resource 
  * @route  /api/resources/:id
  * @method PUT
  * @access private
  */

router.put("/:id",verifyTokenAndAdmin,
asyncHandler(async (req,res) => {
    //validation
const {error} = validateupdateResources(req.body);

if(error){
    return res.status(400).json({message: error.details[0].message});
}
//untill here
const updatedresource = await Resources.findByIdAndUpdate(req.params.id, {
    $set: {
        title:req.body.title,
        publisher:req.body.publisher,
        description:req.body.description,
        
    }
}, { new:true });
res.status(200).json(updatedresource);

 }));

  /**
  * @desc   delete a resource 
  * @route  /api/resources/:id
  * @method DELETE
  * @access private
  */

  router.delete("/:id",verifyTokenAndAdmin,
  asyncHandler(async (req,res) => {
  
    const resource = await Resources.findById(req.params.id);
    if(resource){
        await Resources.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "resource has been deleted"});
    }else{
        res.status(404).json({message: "resource not found"}); 
    }
    
     }));



module.exports = router;