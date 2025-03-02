// Route : /api/ -> To get all property data

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConnection";
import PropertyModel from "@/models/propertyModel";
import CustomerModel from "@/models/customerModel";

export const GET = async () => {
    try {
        await connectDB()
        const data = await PropertyModel.find()

        return new NextResponse(
            JSON.stringify(data),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
            }
        );
    } catch (error) {
        console.error("Database connection error:", error);
        return new Response(
            JSON.stringify({ error: "Failed to connect to the database" }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
};

export const POST = async (req: NextRequest) => {
    try {
        const { name, contact, serviceType } = await req.json();
        // Validate input
        if (!name || !contact || !serviceType) {
            return NextResponse.json(
                { error: "All fields are mandatory" },
                {
                    status: 400, 
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*"
                    },
                }
            );
        }
        await connectDB()
        await CustomerModel.create({
            name,
            contact,
            serviceType,
        });

        return NextResponse.json(
            { msg: "Submitted Successfully! Relax, we'll get back to you soon" },
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
            }
        );
    } catch (error) {
        console.error("Error saving customer:", error); // Log the error for debugging
        return NextResponse.json(
            { error: "Failed to submit" },
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
};
