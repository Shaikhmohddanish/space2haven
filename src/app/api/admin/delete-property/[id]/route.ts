import PropertyModel from "@/models/propertyModel";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConnection";
import mongoose from "mongoose";

export const DELETE = async (req: NextRequest, context: { params: { id: string } }) => {
  console.log("🛠 DELETE API called. Awaiting params...");

  try {
    await connectDB(); // Ensure database connection

    // ✅ Extract the ID properly
    const { id } = context.params;
    console.log("🔍 Property ID to delete:", id);

    if (!id || typeof id !== "string") {
      console.error("❌ Error: Property ID missing in request");
      return NextResponse.json({ error: "Property ID missing" }, { status: 400 });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error("❌ Invalid MongoDB ObjectId format:", id);
      return NextResponse.json({ error: "Invalid MongoDB ObjectId format" }, { status: 400 });
    }

    // ✅ Find the property (Ensure it's NOT an array)
    const property = await PropertyModel.findById(id).lean();

    if (!property || typeof property !== "object" || Array.isArray(property)) {
      console.warn("⚠️ Property not found:", id);
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    console.log("🔍 Property found:", property);

    // ✅ Ensure `_id` exists and is a valid ObjectId
    const propertyId = property?._id?.toString();
    if (!propertyId || !mongoose.Types.ObjectId.isValid(propertyId)) {
      console.error("❌ Error: Property has no valid _id field");
      return NextResponse.json({ error: "Property ID missing in database record" }, { status: 500 });
    }

    // ✅ Ensure property is actually deleted
    const deletionResult = await PropertyModel.deleteOne({ _id: propertyId });

    if (deletionResult.deletedCount === 0) {
      console.error("❌ Property deletion failed:", id);
      return NextResponse.json({ error: "Property deletion failed" }, { status: 500 });
    }

    console.log("✅ Property deleted successfully:", id);

    return NextResponse.json({ msg: "Property deleted successfully" }, { status: 200 });

  } catch (error) {
    console.error("❌ Error deleting property:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
};
