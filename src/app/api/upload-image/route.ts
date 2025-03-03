import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

// ✅ Cloudinary Configuration (You can keep hardcoded keys if needed)
cloudinary.config({
    cloud_name: "dzpastl5k",
    api_key: "738738588681473",
    api_secret: "gUfzp2FtGCmuEEEOu867UajJ1rk",
    secure: true,
});

export const POST = async (req: NextRequest) => {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            console.error("❌ No file uploaded.");
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        // ✅ Convert file to a Base64 Data URI
        const arrayBuffer = await file.arrayBuffer();
        const base64String = Buffer.from(arrayBuffer).toString("base64");
        const mimeType = file.type;
        const fileUri = `data:${mimeType};base64,${base64String}`;

        // ✅ Upload to Cloudinary using the `upload` method
        const result = await cloudinary.uploader.upload(fileUri, {
            folder: "Home2NestGallery",
        });

        if (result?.secure_url) {
            console.log("✅ Image uploaded successfully:", result.secure_url);
            return NextResponse.json({ url: result.secure_url }, { status: 200 });
        } else {
            console.error("❌ Failed to get secure URL from Cloudinary response.");
            return NextResponse.json({ error: "Upload failed" }, { status: 500 });
        }
    } catch (error) {
        console.error("❌ Cloudinary Upload Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
};
