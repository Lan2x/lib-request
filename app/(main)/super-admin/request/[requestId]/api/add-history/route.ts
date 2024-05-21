import prismadb from "@/lib/prismadb";
import { hashPassword } from "@/lib/utils";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("========ADD-HISTORY============");

    let { requestId, stage, remarks } = body;

    console.info(
      "data recieved",

      { requestId, stage, remarks }
    );

    if (!requestId) {
      return NextResponse.json(
        {
          message: "requestId must be provided",
        },
        { status: 409 }
      );
    }

    if (!stage) {
      return NextResponse.json(
        {
          message: "stage must be provided",
        },
        { status: 409 }
      );
    }

    if (!remarks) {
      return NextResponse.json(
        {
          message: "remarksmust be provided",
        },
        { status: 409 }
      );
    }

    const history = await prismadb.stage.create({
      data: {
        requestId: Number(requestId),
        stage,
        remarks,
      },
    });
    return NextResponse.json(history);
  } catch (error) {
    console.log("[HISTORY POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
