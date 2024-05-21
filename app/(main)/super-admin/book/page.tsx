import prismadb from "@/lib/prismadb";
import PropertiesClient from "./components/client";
import { BooksColumn } from "./components/columns";
import { format } from "date-fns";
import { useParams } from "next/navigation";

export const revalidate = 0;
const BooksPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  console.log({ params: searchParams["bookName"] });

  const books = await prismadb.tbl_collection.findMany({
    where: {
      title: {
        contains: searchParams["bookName"],
      },
    },
  });

  console.log("==================BOOKS=================");
  console.log(books);

  const combinedBooks = new Map<
    string,
    {
      ids: number[];
      title: string;
      author: string;
      isbn: string;
      publisher: string;
      publication_date: string;
      edition: string;
      created_at: string;
      price: string;
    }
  >();

  books.forEach((book) => {
    if (combinedBooks.has(book.title)) {
      combinedBooks.get(book.title)?.ids.push(book.id);
    } else {
      combinedBooks.set(book.title, {
        ids: [book.id],
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        publisher: book.publisher,
        publication_date: book.publication_date,
        edition: book.edition || "no edition",
        created_at: format(book.created_at, "MMM dd, yyyy hh:mm a"),
        price: book.price,
      });
    }
  });

  console.info("mapped books", combinedBooks);

  let formattedBooks: BooksColumn[] = [];

  combinedBooks.forEach((item) => {
    formattedBooks.push({
      id: item.ids.toString(),
      title: item.title,
      author: item.author,
      isbn: item.isbn,
      publisher: item.publisher,
      publication_date: item.publication_date,
      edition: item.edition,
      quantity: item.ids.length.toString(),
      price: item.price,
      created_at: item.created_at,
    });
  });

  return (
    <div>
      <div className="flex-col">
        <div className="flex-1 space-y-2 md:p-8 pt-4">
          <PropertiesClient data={formattedBooks} />
        </div>
      </div>
    </div>
  );
};

export default BooksPage;
