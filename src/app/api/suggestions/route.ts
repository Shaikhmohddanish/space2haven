import PropertyModel from "@/models/propertyModel";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConnection";

export const GET = async (req: Request) => {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");

    if (!query || query.trim().length < 1) {
      return NextResponse.json({ error: "Query parameter is required" }, { status: 400 });
    }

    console.log(`🔍 Searching for: "${query}"`);

    // ✅ Match results that CONTAIN the query (instead of just STARTING with it)
    const properties = await PropertyModel.find(
      {
        $or: [
          { title: { $regex: `.*${query}.*`, $options: "i" } },  // Title contains query
          { developer: { $regex: `.*${query}.*`, $options: "i" } },  // Developer contains query
          { location: { $regex: `.*${query}.*`, $options: "i" } },  // Location contains query
          { "address.city": { $regex: `.*${query}.*`, $options: "i" } },  // City contains query
        ],
      },
      { title: 1, developer: 1, location: 1, "address.city": 1 } // Fetch only required fields
    ).limit(10); // Limit results for performance

    if (!properties.length) {
      console.log("❌ No suggestions found.");
      return NextResponse.json({ suggestions: [] }, { status: 200 });
    }

    console.log(`✅ Found ${properties.length} suggestions.`);

    // ✅ Collect Suggestions
    const suggestionsSet = new Set<string>();

    properties.forEach((property) => {
      const values = [property.title, property.developer, property.location, property.address?.city];

      values.forEach((value) => {
        if (value) {
          suggestionsSet.add(value);
        }
      });
    });

    // ✅ Convert Set to Array & Prioritize Exact Matches First
    let suggestionsArray = Array.from(suggestionsSet);

    suggestionsArray.sort((a, b) => {
      const lowerQuery = query.toLowerCase();
      const aLower = a.toLowerCase();
      const bLower = b.toLowerCase();

      // ✅ Exact matches first
      if (aLower === lowerQuery) return -1;
      if (bLower === lowerQuery) return 1;

      // ✅ Titles that start with query come before ones that contain it
      if (aLower.startsWith(lowerQuery) && !bLower.startsWith(lowerQuery)) return -1;
      if (bLower.startsWith(lowerQuery) && !aLower.startsWith(lowerQuery)) return 1;

      // ✅ Otherwise, maintain natural order
      return 0;
    });

    return NextResponse.json({ suggestions: suggestionsArray }, { status: 200 });

  } catch (error) {
    console.error("🚨 API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
