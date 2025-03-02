import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: "dzpastl5k",
  api_key: "738738588681473",
  api_secret: "gUfzp2FtGCmuEEEOu867UajJ1rk",
});

export const addpropertyImages = async (file: Buffer): Promise<string | undefined> => {
  try {
    if (file) {
      const result: UploadApiResponse = await new Promise((resolve, reject) => {
        const uploadImage = cloudinary.uploader.upload_stream(
          { folder: "Home2NestGallery" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        uploadImage.end(file); // Use `file` directly
      });

      return result.secure_url; // Return the secure URL directly
    }
  } catch (error) {
    console.error("❌ Cloudinary Upload Error:", error);
    throw error;
  }
};
