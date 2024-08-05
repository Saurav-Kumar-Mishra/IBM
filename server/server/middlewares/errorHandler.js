const {CustomApiError} = require("../utils/errors")

module.exports = (err, req, res, next)=>{
    if(err instanceof CustomApiError){
        res.status(err.status).json({message: err.message});

    }else{
        res.status(500).json({message: "Server Internal Errr"});
        console.log(err);
    }    
}