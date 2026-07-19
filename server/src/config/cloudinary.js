import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

/* ===========================================================
   CLOUDINARY CONFIGURATION
=========================================================== */

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/* ===========================================================
   HEALTH CHECK
=========================================================== */

if (process.env.NODE_ENV !== "production") {
  console.log("☁️ Cloudinary Connected");

  console.log({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key_loaded: !!process.env.CLOUDINARY_API_KEY,
    api_secret_loaded: !!process.env.CLOUDINARY_API_SECRET,
  });
}

/* ===========================================================
   UPLOAD IMAGE
=========================================================== */

export const uploadImage = (buffer, options = {}) =>
  new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        folder: options.folder || "jvp",
        overwrite: true,
        invalidate: true,
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve({
          /* Cloudinary IDs */
          publicId: result.public_id,
          assetId: result.asset_id,
          version: result.version,
          signature: result.signature,

          /* URLs */
          url: result.url,
          secureUrl: result.secure_url,

          /* File Information */
          resourceType: result.resource_type,
          format: result.format,
          bytes: result.bytes,
          width: result.width,
          height: result.height,

          /* Organization */
          folder: result.folder,
          originalFilename: result.original_filename,
          displayName: result.display_name,

          /* Default Metadata */
          alt: "",
          caption: "",
          tags: [],
          isPrimary: false,
          isActive: true,
          uploadedAt: new Date(),
        });
      }
    );

    streamifier.createReadStream(buffer).pipe(uploadStream);
  });

/* ===========================================================
   DELETE IMAGE
=========================================================== */

export const deleteImage = async (publicId) => {
  if (!publicId) return null;

  return cloudinary.uploader.destroy(publicId, {
    invalidate: true,
  });
};

/* ===========================================================
   DELETE MULTIPLE IMAGES
=========================================================== */

export const deleteImages = async (publicIds = []) => {
  if (!publicIds.length) return [];

  return Promise.all(
    publicIds.filter(Boolean).map((id) => deleteImage(id))
  );
};

/* ===========================================================
   EXPORT CLOUDINARY INSTANCE
=========================================================== */

export default cloudinary;