import { connectDB } from "@/lib/dbConnection";
import CustomerModel from "@/models/customerModel";
import { NextRequest, NextResponse } from "next/server";
// import { adminMiddleware } from "../../../../../../middlewares/adminMiddleware";

export const GET = async (req: NextRequest) => {

    // console.log("Request : ", req);
    
    // const middlewareResponse = adminMiddleware(req);
    
    // if (middlewareResponse) return middlewareResponse;

    try {
        await connectDB()

        const getCustomers = await CustomerModel.find().sort({ createdAt: -1 })

        if (!getCustomers) return NextResponse.json(
            { msg: "Data not found!" },
            {
                status: 404,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
            }
        );


        return NextResponse.json(getCustomers,{
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
            }
        );
    } catch (error) {
        console.error("Error fetching cookie:", error);

        return NextResponse.json(
            { error: "Failed to retrieve customers data." },
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }
};
