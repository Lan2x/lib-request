import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } }
) {
  const body = await req.json();
  let { email } = body;

  try {
    const sameEmail = await prismadb.tbl_user.findFirst({
      where: {
        email,
      },
    });

    if (sameEmail) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400, statusText: "Email already exists" }
      );
    }

    await prismadb.tbl_user.update({
      where: {
        id: parseInt(params.userId),
      },
      data: {
        email,
      },
    });

    return NextResponse.json({ message: "Email changed successfully" });
  } catch (err) {
    console.log("CHANGE_EMAIL_PATCH", err);
    return new NextResponse("Error changing email", { status: 500 });
  }
}
