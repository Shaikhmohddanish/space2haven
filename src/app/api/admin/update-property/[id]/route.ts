import { NextRequest, NextResponse } from "next/server";
import PropertyModel from "@/models/propertyModel";
import { connectDB } from "@/lib/dbConnection";
import mongoose from "mongoose";
import { addpropertyImages } from "@/lib/cloudinary";

// 🛠 Function to process FormData and return an object
const processFormData = async (req: NextRequest): Promise<Record<string, any>> => {
    const formData = await req.formData();
    const propertyData: Record<string, any> = {};
    const newImages: string[] = [];

    for (const [key, value] of formData.entries()) {
        if (key === "images" && value instanceof File) {  
            console.log(`📸 Processing image: ${value.name}`);  // ✅ Debugging
            const buffer = await value.arrayBuffer();
            const imgUrl = await addpropertyImages(Buffer.from(buffer));
            if (imgUrl) {
                newImages.push(imgUrl);
            }
        } else if (key.includes("[")) {
            // 🛠 Handle nested objects like address[city]
            const match = key.match(/^([^\[]+)\[([^\]]+)\]$/);
            if (match) {
                const parentKey = match[1];
                const childKey = match[2];
                propertyData[parentKey] = propertyData[parentKey] || {};
                propertyData[parentKey][childKey] = value.toString().trim();
            }
        } else if (key === "existingImages") {
            // 🛠 Handle existing images
            try {
                propertyData.images = JSON.parse(value.toString()) || [];
            } catch (error) {
                console.error("❌ Error parsing existing images:", error);
                propertyData.images = [];
            }
        } else {
            // 🛠 Handle other fields (including arrays)
            try {
                const parsedValue = JSON.parse(value.toString().trim());
                propertyData[key] = Array.isArray(parsedValue) ? parsedValue : parsedValue;
            } catch {
                propertyData[key] = value.toString().trim();
            }
        }
    }

    // 🛠 Append new images to the existing images array if any
    if (newImages.length > 0) {
        propertyData.images = [...(propertyData.images || []), ...newImages];
    }

    console.log("🛠 Processed FormData:", propertyData);  // ✅ Debugging step

    return propertyData;
};

// 🛠 Updated PUT handler
export const PUT = async (req: NextRequest, { params }: { params: { id: string } }) => {
    console.log("🛠 UPDATE API called. Awaiting params...");

    try {
        await connectDB(); // Ensure database connection
        const { id } = params;  // 🛠 Corrected parameter extraction
        console.log("🔍 Property ID to update:", id);

        if (!id || typeof id !== "string") {
            return NextResponse.json({ error: "Property ID missing" }, { status: 400 });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ error: "Invalid MongoDB ObjectId format" }, { status: 400 });
        }

        const updatedProperty = await processFormData(req); // 🛠 Use the new form data processor

        // ✅ Ensure property exists before updating
        const existingProperty = await PropertyModel.findById(id);
        if (!existingProperty) {
            return NextResponse.json({ error: "Property not found" }, { status: 404 });
        }

        // ✅ Update the property
        const updateResult = await PropertyModel.findByIdAndUpdate(id, updatedProperty, { new: true });

        console.log("✅ Property updated successfully:", updateResult);
        return NextResponse.json({ msg: "Property updated successfully", updatedProperty: updateResult }, { status: 200 });

    } catch (error) {
        console.error("❌ Error updating property:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};
