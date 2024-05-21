import prismadb from "@/lib/prismadb";
import { hashPassword } from "@/lib/utils";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("========ADD-BOOK============");

    // title: string;
    // author: string;
    // isbn: string;
    // publisher: string;
    // publication_date: string;
    // edition: string;
    // call_number: string;
    // availability: string;
    // created_at: string;
    // quantity: string;

    let {
      title,
      author,
      isbn,
      publisher,
      publication_date,
      edition,
      availability,
      quantity,
      price,
    } = body;

    console.info(
      "data recieved",

      {
        title,
        author,
        isbn,
        publisher,
        publication_date,
        edition,
        availability,
        quantity,
        price,
      }
    );

    if (!title) {
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

    if (!isbn) {
      return NextResponse.json(
        {
          message: "author must be provided",
        },
        { status: 409 }
      );
    }

    if (!publisher) {
      return NextResponse.json(
        {
          message: "copyright date must be provided",
        },
        { status: 409 }
      );
    }

    if (!publication_date) {
      return NextResponse.json(
        {
          message: "unit cost must be provided",
        },
        { status: 409 }
      );
    }

    if (!edition) {
      return NextResponse.json(
        {
          message: "total cost must be provided",
        },
        { status: 409 }
      );
    }

    if (!price) {
      return NextResponse.json(
        {
          message: "price must be provided",
        },
        { status: 409 }
      );
    }

    for (let i = 0; i < quantity; i++) {
      await prismadb.tbl_collection.create({
        data: {
          title,
          author,
          isbn,
          publisher,
          publication_date,
          edition,
          availability: true,
          price,
          quantity: "",
        },
      });
    }

    return NextResponse.json({});
  } catch (error) {
    console.log("[REQUEST POST]", error);
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
