import { NextResponse } from "next/server";

export const POST = async () => {
    return NextResponse.json(
        { error: "Admin signup is disabled." },
        {
            status: 403,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        }
    );
};
