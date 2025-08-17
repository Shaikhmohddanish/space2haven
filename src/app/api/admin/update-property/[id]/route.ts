import { NextRequest, NextResponse } from "next/server";
import PropertyModel from "@/models/propertyModel";
import { connectDB } from "@/lib/dbConnection";
import mongoose from "mongoose";
import { generateSlug } from "@/lib/slug";

const processFormData = async (req: NextRequest): Promise<Record<string, any>> => {
  const formData = await req.formData();
  const propertyData: Record<string, any> = {};
  const imageUrls: string[] = [];

  for (const [key, value] of formData.entries()) {
      if (key === "images") {
          // ✅ Accept image URLs directly
          imageUrls.push(value.toString().trim());
      } else if (key.includes("[")) {
          const match = key.match(/^([^\[]+)\[([^\]]+)\]$/);
          if (match) {
              const parentKey = match[1];
              const childKey = match[2];
              propertyData[parentKey] = propertyData[parentKey] || {};
              propertyData[parentKey][childKey] = value.toString().trim();
          }
      } else if (key === "existingImages") {
          // ✅ Accept existing images directly as URLs
          try {
              const existingImages = JSON.parse(value.toString()) || [];
              imageUrls.push(...existingImages);
          } catch (error) {
              console.error("❌ Error parsing existing images:", error);
          }
      } else {
          // ✅ Handle other fields
          try {
              const parsedValue = JSON.parse(value.toString().trim());
              propertyData[key] = parsedValue;
          } catch {
              propertyData[key] = value.toString().trim();
          }
      }
  }

  // ✅ Assign combined image URLs to property data
  propertyData.images = imageUrls;
  console.log("🛠 Processed FormData:", propertyData);
  return propertyData;
};


export const PUT = async (req: NextRequest, context: any) => {
  const { params } = context;
  const { id } = params;
  console.log("🛠 UPDATE API called. Awaiting params...");
  console.log("🔍 Property ID to update:", id);

  try {
    await connectDB(); // Ensure database connection

    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "Property ID missing" }, { status: 400 });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid MongoDB ObjectId format" }, { status: 400 });
    }

    // Process the form data from the request
    const updatedProperty = await processFormData(req);

    // Ensure property exists before updating
    const existingProperty = await PropertyModel.findById(id);
    if (!existingProperty) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    // If title changed, refresh slug
    if (updatedProperty.title) {
      updatedProperty.slug = generateSlug(updatedProperty.title);
    }
    // Update the property in the database
    const updateResult = await PropertyModel.findByIdAndUpdate(id, updatedProperty, { new: true });
    console.log("✅ Property updated successfully:", updateResult);
    return NextResponse.json(
      { msg: "Property updated successfully", updatedProperty: updateResult },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error updating property:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
};
