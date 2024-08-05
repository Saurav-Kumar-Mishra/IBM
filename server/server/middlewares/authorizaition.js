const { AuthorizationError } = require("../utils/errors")

module.exports = (req,res, next)=>{
    if(!req.user)
        throw new AuthorizationError("User not found");

    next();
}