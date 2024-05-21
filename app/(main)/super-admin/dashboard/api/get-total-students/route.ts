import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // const students = await prismadb.student.count();
    return NextResponse.json({});
  } catch (error) {
    return NextResponse.json(
      {
        message: "password must be provided",
      },
      { status: 409 }
    );
  }
}
