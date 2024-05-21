import prismadb from "@/lib/prismadb";
import { hashPassword } from "@/lib/utils";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const body = await req.json();

    let { password } = body;

    console.log("------------CHANGING PASSWORDS-------------------");
    console.log(password);

    password = hashPassword(password);

    const user = await prismadb.tbl_user.update({
      data: {
        password,
      },
      where: {
        id: parseInt(params.userId),
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("[USERS_PASSWORD_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
