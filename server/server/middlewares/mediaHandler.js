const fileUpload = require("express-fileupload");

const cloudinary = require("cloudinary").v2;


async function uploadToCloudinary(file, folder) {
  console.log("hello")
  const options = { folder }; // Ensure the correct options object
  options.resource_type = "auto";
  try {
    const result = await cloudinary.uploader.upload(file, options);
    return result;
  } catch (error) {
    throw new Error(`Cloudinary upload failed: ${error.message}`);
  }
}

const imgFileHandle = async (req, res, next) => {
  

  console.log("step 1");
  console.log(req.product)
  if (!req.files) {
    console.log('no file present')
    res.json({
      success: false,
      message: "file Upload Error",
    });
  }
  // const decodedToken = req.token;
  
  let Files = req.files.file;
  console.log('error requestiong file')
  const imgExt = ["png", "jpg", "jpeg", "svg", "mov"];
  console.log("step 2")
  Files = Array.isArray(Files) ? Files : [Files];
  console.log("step 3")

  // checking file name length should be less than 30 character
  for (element of Files) {
    const ext = element.name.indexOf(".") + 1;
    if (element.name.length > 50) {
      return res.json({
        success: false,
        filenameExceedingLength: element.name,
        message:
          "file name length exceeded (should be less than or equal to 30)",
        extension: element.name.slice(ext),
      });
    } else if (!imgExt.includes(element.name.slice(ext))) {
      return res.json({
        success: false,
        filenameExceedingLength: element.name,
        message: "image File format not supported",
        extension: element.name.slice(ext),
      });
    }
  }
    console.log("step 4")

  try {
    const uploadResults = [];
    for (const element of Files) {
      const result = await uploadToCloudinary(element.tempFilePath, "E-commerce");
      uploadResults.push(result.secure_url);
    console.log("step 5")

    }
    console.log(uploadResults);
  //  await user.updateOne({_id:decodedToken.id},{profilePic:uploadResults[0]})
  req.images=uploadResults;
  console.log("step 6")

  //  return res.json({
  //     success: true,
  //     message: "Files uploaded successfully",
  //     totalImagesUploaded: Files.length,
  //     imageLinks: uploadResults,
  //   });
  } catch (error) {
  console.log("step 7 error")

   return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  next();
//  return res.json({
//     success: true,
//     message: "file Uploaded successfully",
//     totalVideoFilesUploaded: Files.length,
//   });
};

module.exports = { imgFileHandle };
