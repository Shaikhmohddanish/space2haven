import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

// ✅ Hardcoded Cloudinary Configuration
cloudinary.config({
    cloud_name: "dzpastl5k",
    api_key: "738738588681473",
    api_secret: "gUfzp2FtGCmuEEEOu867UajJ1rk",
});

export const POST = async (req: NextRequest) => {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const result = await new Promise<string | undefined>((resolve, reject) => {
            const uploadImage = cloudinary.uploader.upload_stream(
                { folder: "Home2NestGallery" },
                (error, result) => {
                    if (error) {
                        console.error("❌ Cloudinary Upload Error:", error);
                        reject(undefined);
                    } else if (result) {
                        resolve(result.secure_url);
                    } else {
                        reject(undefined);
                    }
                }
            );
            uploadImage.end(buffer);
        });

        if (!result) {
            return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
        }

        return NextResponse.json({ url: result });
    } catch (error) {
        console.error("❌ Cloudinary Upload Error:", error);
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
};
