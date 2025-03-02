import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {
    try {
        const response = NextResponse.json({ message: 'Admin logged out' },
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
            }
        );

        response.cookies.set('admin_cookie_token', '', {
            httpOnly: true,
            expires: new Date(0),
            path: '/',
        });
        
        return response;
    } catch (error) {
        console.error("Error saving customer:", error);
        return NextResponse.json(
            { error: "Failed to sign out!" },
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}