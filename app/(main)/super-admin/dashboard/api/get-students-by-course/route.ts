import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  // let sample = [
  //   { name: "BSIT", total: 32 },
  //   { name: "BSES", total: 12 },
  //   { name: "BSMATH", total: 25 },
  //   { name: "BSMT", total: 20 },
  //   { name: "BSCHEM", total: 30 },
  // ];
  try {
    // const students = await prismadb.student.groupBy({
    //   by: ["course"],
    //   _count: true,
    // });
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
