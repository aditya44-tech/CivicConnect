import cloudinary from "cloudinary";

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

const configured =
  Boolean(cloudName) && Boolean(apiKey) && Boolean(apiSecret);

if (configured) {
  cloudinary.v2.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });
}

/** The configured v2 client, or null when env vars are missing. */
export default configured ? cloudinary.v2 : null;
