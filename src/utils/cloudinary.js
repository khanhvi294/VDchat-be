import cloudinaryLib from "cloudinary";

const cloudinary = cloudinaryLib.v2;

const cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
const api_key = process.env.CLOUDINARY_API_KEY;
const api_secret = process.env.CLOUDINARY_API_SECRET;

cloudinary.config({
  cloud_name: cloud_name,
  api_key: api_key,
  api_secret: api_secret,
});

const opts = {
  overwrite: true,
  // invalidate: true,
  resource_type: "auto",
  unique_filename: true,
  // use_filename: true,
  folder: "vd-chat/images",
};

const uploadImage = (image) => {
  //imgage = > base64
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, opts, (error, result) => {
      if (result && result.secure_url) {
        console.log(result);
        return resolve(result.secure_url);
      }
      console.log(error);
      return reject({ message: error.message });
    });
  });
};

export { uploadImage };
