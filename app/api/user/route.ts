import { NextRequest, NextResponse } from "next/server";
import { getUsers } from "../controllers/userControllers";

export async function GET(req: NextRequest) {
    const response: NextResponse = await getUsers(req);
    return response
}