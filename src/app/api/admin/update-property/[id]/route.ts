import PropertyModel from "@/models/propertyModel";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConnection";
import mongoose from "mongoose";
import { addpropertyImages } from "@/lib/cloudinary";

// Function to process FormData and return an object
const processFormData = async (req: NextRequest): Promise<any> => {
    const formData = await req.formData();
    const propertyData: Record<string, any> = {};
    const newImages: string[] = [];

    for (const [key, value] of formData.entries()) {
        if (key === "images" && value instanceof File) {  
            console.log(`Processing image: ${value.name}`);  // ✅ Debugging
            const buffer = await value.arrayBuffer();
            const imgUrl = await addpropertyImages(Buffer.from(buffer));
            if (imgUrl) {
                newImages.push(imgUrl);
            }
        } else if (key.includes("[")) {
            const match = key.match(/^([^\[]+)\[([^\]]+)\]$/);
            if (match) {
                const parentKey = match[1];
                const childKey = match[2];
                propertyData[parentKey] = propertyData[parentKey] || {};
                propertyData[parentKey][childKey] = value.toString().trim();
            }
        } else if (key === "existingImages") {
            propertyData.images = JSON.parse(value.toString());
        } else {
            try {
                propertyData[key] = JSON.parse(value.toString().trim());
            } catch {
                propertyData[key] = value.toString().trim();
            }
        }
    }

    // Append new images to existing images array
    if (newImages.length > 0) {
        propertyData.images = [...(propertyData.images || []), ...newImages];
    }

    return propertyData;
};

export const PUT = async (req: NextRequest, context: { params: { id: string } }) => {
    console.log("🛠 UPDATE API called. Awaiting params...");

    try {
        await connectDB(); // Ensure database connection
        const { id } = context.params;
        console.log("🔍 Property ID to update:", id);

        if (!id || typeof id !== "string") {
            return NextResponse.json({ error: "Property ID missing" }, { status: 400 });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ error: "Invalid MongoDB ObjectId format" }, { status: 400 });
        }

        const updatedProperty = await processFormData(req); // Use the new form data processor

        // ✅ Ensure property exists before updating
        const existingProperty = await PropertyModel.findById(id);
        if (!existingProperty) {
            return NextResponse.json({ error: "Property not found" }, { status: 404 });
        }

        // ✅ Update the property
        await PropertyModel.findByIdAndUpdate(id, updatedProperty);

        console.log("✅ Property updated successfully:", id);
        return NextResponse.json({ msg: "Property updated successfully" }, { status: 200 });

    } catch (error) {
        console.error("❌ Error updating property:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};
