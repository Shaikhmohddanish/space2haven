import { connectDB } from "@/lib/dbConnection";
import PropertyModel from "@/models/propertyModel";
import { NextRequest, NextResponse } from "next/server";
import { addpropertyImages } from "@/lib/cloudinary";

const processFormData = async (req: Request): Promise<any> => {
    const formData = await req.formData();
        
    const propertyData: Record<string, any> = {};
    propertyData.images = []; // Ensure images is an array

    for (const [key, value] of formData.entries()) {
        if (key === "images" && value instanceof File) {  
            console.log(`Processing image: ${value.name}`);  // ✅ Debugging
            const buffer = await value.arrayBuffer();
            const imgUrl = await addpropertyImages(Buffer.from(buffer));
            if (imgUrl) {
                propertyData.images.push(imgUrl);
            }
        } else if (key.includes("[")) {
            const match = key.match(/^([^\[]+)\[([^\]]+)\]$/);
            if (match) {
                const parentKey = match[1];
                const childKey = match[2];
                propertyData[parentKey] = propertyData[parentKey] || {};
                propertyData[parentKey][childKey] = value;
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
        // ✅ Fix: Ensure error is of type `Error`
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



