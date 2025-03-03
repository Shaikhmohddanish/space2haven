import { connectDB } from "@/lib/dbConnection";
import PropertyModel from "@/models/propertyModel";
import { NextRequest, NextResponse } from "next/server";

const processFormData = async (req: Request): Promise<any> => {
    const formData = await req.formData();

    const propertyData: Record<string, any> = {};
    propertyData.images = []; // Ensure images is an array

    // ✅ Handle image URLs directly instead of files
    for (const [key, value] of formData.entries()) {
        if (key === "images") {
            // ✅ Directly append image URLs to the array
            propertyData.images.push(value.toString().trim());
        } else if (key.includes("[")) {
            const match = key.match(/^([^\[]+)\[([^\]]+)\]$/);
            if (match) {
                const parentKey = match[1];
                const childKey = match[2];
                propertyData[parentKey] = propertyData[parentKey] || {};
                propertyData[parentKey][childKey] = value.toString().trim();
            }
        } else {
            propertyData[key] = value.toString().trim();
        }

        if (typeof propertyData.configuration === "string") {
            try {
                propertyData.configuration = JSON.parse(propertyData.configuration);
            } catch {
                propertyData.configuration = [];
            }
        }
    }

    console.log("✅ Uploaded Image URLs:", propertyData.images);

    return propertyData;
};


export const POST = async (req: NextRequest) => {
    try {
        console.log("✅ Request received for adding property");

        const inputData = await processFormData(req);
        console.log("✅ Processed FormData:", inputData);

        if (!inputData.images || inputData.images.length === 0) {
            console.error("❌ No images uploaded or images array is empty!");
            return NextResponse.json(
                { error: "No images uploaded. Ensure files are under 500 KB and in correct format." },
                { status: 400 }
            );
        }

        await connectDB();
        const addProperty = new PropertyModel(inputData);
        await addProperty.save();

        console.log("✅ Property added successfully:", addProperty);
        return NextResponse.json(
            { msg: "Property added successfully!" },
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof Error) {
            console.error("❌ Error while adding property:", error.message);
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        } else {
            console.error("❌ Unknown error occurred:", error);
            return NextResponse.json(
                { error: "Internal Server Error. Could not add property." },
                { status: 500 }
            );
        }
    }
};
