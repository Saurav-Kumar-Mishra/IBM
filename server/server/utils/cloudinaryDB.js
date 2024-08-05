const cloudinary = require('cloudinary').v2;
require('dotenv').config();


cloudinaryConnect=()=>{
    try {
      cloudinary.config({
        cloud_name:"dpe59n5dq",
        api_key:"144155865342554",
        api_secret:"2s8sHc2Dw2qzIEGEFpEzW4EJGbQ",
      })
      console.log("couldinary Connected!")
    } catch (error) {
      console.error(error);
    }
}
module.exports=cloudinaryConnect;