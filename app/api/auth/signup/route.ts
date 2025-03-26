import { NextRequest, NextResponse } from "next/server";
import { signup } from "../../controllers/authControllers";

export async function POST(req: NextRequest) {
    const response: NextResponse = await signup(req);
    return response
}