const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

const {Report,validatecreateReport,validateupdateReport} =require("../models/Report");

const {User,validateupdate}= require("../models/User");
const {verifyToken,verifyTokenAndAdmin} =require("../middlewares/verifyToken");







 /**
  * @desc   get all reports
  * @route  /api/reports
  * @method GET
  * @access public
  */
 
 router.get("/" , asyncHandler(async (req,res) => {
    //comparioson query operators
    //$in : [8,9] //$nin //$eq //$ne //$lt //$lte //$gt //$gte 
    
    
    const {Title} =req.query;
    let reports;
    if(Title){
        reports=await Report.find({title: {$eq:Title}});
       
    }else {
        reports=await Report.find();
      
    }
    
    res.status(200).json(reports);
 }));

  /**
  * @desc   get Report by id
  * @route  /api/reports/:id
  * @method GET
  * @access public
  */

 router.get("/:id" , asyncHandler(async (req,res) => {
   const report = await Report.findById(req.params.id);
  
 if(report){
    res.status(200).json(report);
 }else{
    res.status(404).json({message: "Report not found"});
 }

}));



 /**
  * @desc   creat new reportS
  * @route  /api/reportS
  * @method POST
  * @access public
  */

 router.post("/", verifyToken, asyncHandler(async (req, res) => {
    const { error } = validatecreateReport(req.body);

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const userId = req.user.id; // Retrieve user ID from the authenticated user

    const report = new Report({
        Type: req.body.Type,
        location: req.body.location,
        description: req.body.description,
        media: req.body.media,
        userId: req.body.userId, // Assign the user ID to the report
    });

    const result = await report.save()

    // Update the user's score
    const resulst= await User.findByIdAndUpdate(userId, { $inc: { score: 1 } })

    res.status(200).json(report);
    
}));




   



 /**
  * @desc   update a report 
  * @route  /api/reports/:id
  * @method PUT
  * @access private
  */

router.put("/:id",verifyToken,
asyncHandler(async (req,res) => {
    //validation
const {error} = validateupdateReport(req.body);

if(error){
    return res.status(400).json({message: error.details[0].message});
}
//untill here
const updatedreport = await Report.findByIdAndUpdate(req.params.id, {
    $set: {
        Type:req.body.Type,
        location:req.body.location,
        description:req.body.description,
        media:req.body.media,
        
    }
}, { new:true });
res.status(200).json(updatedreport);

 }));


  /**
  * @desc   delete a Report 
  * @route  /api/reports/:id
  * @method DELETE
  * @access private
  */

  router.delete("/:id",verifyToken,
  asyncHandler(async (req,res) => {
  
    const report = await Report.findById(req.params.id);
    if(report){
        await Report.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "report has been deleted"});
    }else{
        res.status(404).json({message: "report not found"}); 
    }
    
     }));



module.exports = router;