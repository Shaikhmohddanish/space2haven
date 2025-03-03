// src/app/api/upload-image/route.ts
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        // ✅ Upload to Cloudinary
        const cloudinaryFormData = new FormData();
        cloudinaryFormData.append("file", file);
        cloudinaryFormData.append("upload_preset", "Home2NestGallery");

        const response = await fetch("https://api.cloudinary.com/v1_1/dzpastl5k/image/upload", {
            method: "POST",
            body: cloudinaryFormData,
        });

        const data = await response.json();

        if (response.ok) {
            return NextResponse.json({ url: data.secure_url }, { status: 200 });
        } else {
            return NextResponse.json({ error: data.error?.message || "Upload failed" }, { status: 500 });
        }
    } catch (error) {
        console.error("❌ Upload Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
};
