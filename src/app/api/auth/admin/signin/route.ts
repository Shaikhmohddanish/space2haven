import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const { email, password } = await req.json();

        // Hardcoded admin credentials
        const adminEmail = "admin@admin.com";
        const adminPassword = "admin";

        if (email !== adminEmail || password !== adminPassword) {
            return NextResponse.json(
                { error: "Invalid username or password" },
                { status: 401 }
            );
        }

        return NextResponse.json(
            { message: "Login successful" },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error in admin login:", error);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
};
