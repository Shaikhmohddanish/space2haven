import { NextRequest, NextResponse } from "next/server";

export const adminMiddleware = async (req: NextRequest) => {
    return NextResponse.next();
};

export const config = {
    matchers: "/api/admin/*"
};
