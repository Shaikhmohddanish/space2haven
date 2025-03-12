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

    // ✅ Strict match only for results that START with the query
    const properties = await PropertyModel.find(
      {
        $or: [
          { title: { $regex: `^${query}`, $options: "i" } },  // Title must start with query
          { developer: { $regex: `^${query}`, $options: "i" } },  // Developer must start with query
          { location: { $regex: `^${query}`, $options: "i" } },  // Location must start with query
          { "address.city": { $regex: `^${query}`, $options: "i" } },  // City must start with query
        ],
      },
      { title: 1, developer: 1, location: 1, "address.city": 1 } // Fetch only required fields
    ).limit(10); // Limit results for performance

    if (!properties.length) {
      console.log("❌ No suggestions found.");
      return NextResponse.json({ suggestions: [] }, { status: 200 });
    }

    console.log(`✅ Found ${properties.length} suggestions.`);

    // ✅ Remove duplicates & return only the relevant results
    const suggestionsSet = new Set<string>();

    properties.forEach((property) => {
      const values = [property.title, property.developer, property.location, property.address?.city];

      values.forEach((value) => {
        if (value && value.toLowerCase().startsWith(query.toLowerCase())) {
          suggestionsSet.add(value);
        }
      });
    });

    return NextResponse.json({ suggestions: Array.from(suggestionsSet) }, { status: 200 });

  } catch (error) {
    console.error("🚨 API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
