import PropertyModel from "@/models/propertyModel";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/dbConnection";

export const GET = async (req: Request) => {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);

    const id = searchParams.get("id");
    const slug = searchParams.get("slug");
    const query = searchParams.get("query");
    const bhk = searchParams.get("bhk");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const propertyType = searchParams.get("propertyType")?.split(",");

    let filter: any = {};

    // ✅ Fetch property by ID if present
    if (id) {
      console.log("Fetching property with ID:", id); // ✅ Debugging

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ error: "Invalid property ID" }, { status: 400 });
      }

      const matchingData = await PropertyModel.findById(id).lean();

      if (matchingData && !Array.isArray(matchingData) && matchingData.features?.length) {
        try {
          if (
            Array.isArray(matchingData.features) &&
            matchingData.features.length === 1 &&
            typeof matchingData.features[0] === "string" &&
            matchingData.features[0].startsWith("[")
          ) {
            const parsed = JSON.parse(matchingData.features[0]);
            if (Array.isArray(parsed)) {
              matchingData.features = parsed;
            }
          }
        } catch (error) {
          console.error("❌ Error parsing features:", error);
        }
        
    }
    


      if (!matchingData) {
        return NextResponse.json({ error: "Property not found" }, { status: 404 });
      }

      console.log("Property found:", matchingData); // ✅ Debugging

      // ✅ Fetch 3 recommended properties (excluding the current one)
      const recommendedData = await PropertyModel.find({ _id: { $ne: id } }).limit(3);

      return NextResponse.json(
        { matchingData, recommendedData },
        {
          status: 200,
          headers: {
            "Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400",
          },
        }
      );
    }

    // ✅ Fetch property by slug if present
    if (slug) {
      const matchingData = await PropertyModel.findOne({ slug }).lean();

      if (!matchingData) {
        return NextResponse.json({ error: "Property not found" }, { status: 404 });
      }

      const recommendedData = await PropertyModel.find({ _id: { $ne: matchingData._id } }).limit(3);
      return NextResponse.json({ matchingData, recommendedData }, { status: 200 });
    }

    // ✅ Apply search filters if neither `id` nor `slug` is present
    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: "i" } },
        { location: { $regex: query, $options: "i" } },
        { "address.city": { $regex: query, $options: "i" } },
        { "address.state": { $regex: query, $options: "i" } },
      ];
    }

    if (bhk) {
      if (bhk === "4+ BHK") {
        // Include properties that have 4 BHK or more
        filter.configuration = { $regex: /^[4-9]\s?BHK|\d{2,}\s?BHK$/, $options: "i" };
      } else {
        filter.configuration = bhk;
      }
    }
    if (minPrice) filter.price = { $gte: parseInt(minPrice) };
    if (maxPrice) filter.price = { ...filter.price, $lte: parseInt(maxPrice) };
    if (propertyType) filter.propertyType = { $in: propertyType };

    console.log("🔎 Filtering with:", JSON.stringify(filter)); // ✅ Debugging

    // ✅ Fetch multiple properties based on filters
    const searchResults = await PropertyModel.find(filter);
    console.log("✅ Returning results:", searchResults.length);

    return NextResponse.json(searchResults, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400",
      },
    });
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
