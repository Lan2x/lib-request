import prismadb from "@/lib/prismadb";
import { hashPassword } from "@/lib/utils";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function PATCH(req: Request, { params }: { params: string }) {
  try {
    const body = await req.json();

    console.log("========UPDATE-REQUEST============");

    let {
      id,
      userId,
      book_name,
      author,
      copyright_date,
      unit_cost,
      total_cost,
      quantity,
    } = body;

    console.info(
      "data recieved",

      {
        id,
        userId,
        book_name,
        author,
        copyright_date,
        unit_cost,
        total_cost,
        quantity,
      }
    );

    if (!book_name) {
      return NextResponse.json(
        {
          message: "book name must be provided",
        },
        { status: 409 }
      );
    }

    if (!author) {
      return NextResponse.json(
        {
          message: "author must be provided",
        },
        { status: 409 }
      );
    }

    if (!quantity) {
      return NextResponse.json(
        {
          message: "author must be provided",
        },
        { status: 409 }
      );
    }

    if (!copyright_date) {
      return NextResponse.json(
        {
          message: "copyright date must be provided",
        },
        { status: 409 }
      );
    }

    if (!unit_cost) {
      return NextResponse.json(
        {
          message: "unit cost must be provided",
        },
        { status: 409 }
      );
    }

    if (!total_cost) {
      return NextResponse.json(
        {
          message: "total cost must be provided",
        },
        { status: 409 }
      );
    }

    const request = await prismadb.request.update({
      where: {
        id: parseInt(id),
      },
      data: {
        book_name,
        author,
        copyright_date,
        unit_cost,
        total_cost,
        userId: parseInt(userId),
        quantity,
      },
    });
    return NextResponse.json(request);
  } catch (error) {
    console.log("[REQUEST PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// export async function GET(req: Request) {
//   try {
//     const books = await prismadb.book.findMany({});

//     return NextResponse.json(books);
//   } catch (error) {
//     console.log("[BOOKS_GET]", error);
//     return new NextResponse("Internal error", { status: 500 });
//   }
// }
