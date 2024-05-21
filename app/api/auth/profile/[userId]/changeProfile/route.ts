import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const body = await req.json();

    let { firstName, middleName, lastName } = body;

    console.log({ firstName, middleName, lastName, id: params.userId });

    const user = await prismadb.tbl_user.update({
      data: {
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
      },
      where: {
        id: parseInt(params.userId),
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("[USERS_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
