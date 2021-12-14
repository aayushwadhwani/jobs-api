const { customAPIErrors } = require('../errors/customApiErrors');

const errorHandlerMiddleware = ( err,req,res,next ) =>{
    if(err instanceof customAPIErrors){
        return res.status(err.statusCode).json({success:false, msg:err.message});
    }
    res.status(500).json({success: false, msg:err});
}

module.exports = errorHandlerMiddleware;