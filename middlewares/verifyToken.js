const jwt=require("jsonwebtoken");

//verify token
function verifyToken(req,res,next) {
    const token= req.headers.token;
    if(token){
        try{
            const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
            req.user=decoded;
            next();//-> update user  
        }catch(error){
            res.status(401).json({message: "invalid token"});
        }
    }else{
        res.status(401).json({message: "no token provided"});
    }
}



//verify token & authorize the user 
function verifyTokenAndAuthorization(req,res,next) {
    verifyToken(req,res,() => {
        if(req.user.id === req.params.id || req.user.isAdmin){
           next();
        }else{
            return res.status(403).json({message:"You are not authorized to perform this action"});//403=forbidden
        }
    });
}



//verify token & admin
function verifyTokenAndAdmin(req,res,next) {
    verifyToken(req,res,() => {
        if(req.user.isAdmin){
           next();
        }else{
            return res.status(403).json({message:"You are not authorized to perform this action,onlu admin"});//403=forbidden
        }
    });
}



module.exports ={
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
}

