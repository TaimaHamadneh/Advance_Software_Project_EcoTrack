const notfound = (err,req,res,next)=>{
    const error = new Error(`not found - ${req.originalUrl}`);
    res.status(400);
    next(error);
};
const errorHandler =(err,req,res,next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    return res.status(statusCode).json({message : err.message});
};

module.exports ={
    notfound,
    errorHandler,
}