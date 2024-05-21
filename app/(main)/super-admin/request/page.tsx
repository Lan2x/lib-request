import prismadb from "@/lib/prismadb";
import PropertiesClient from "./components/client";
import { RequestsColumn } from "./components/columns";
import { format } from "date-fns";
import { useParams } from "next/navigation";

export const revalidate = 0;
const RequestsPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  console.log({ params: searchParams["bookName"] });

  const students = await prismadb.request.findMany({
    where: {
      book_name: {
        contains: searchParams["bookName"],
      },
    },
    include: {
      Stage: true,
      user: true,
    },
    orderBy: {
      date_requested: "asc",
    },
  });

  const formattedRequests: RequestsColumn[] = students.map((item) => {
    const latestStage = item.Stage[item.Stage.length - 1];
    let formattedStage: string = "sent";

    if (latestStage) {
      formattedStage = `${latestStage.stage} (${format(
        latestStage.created_at,
        "MMM dd, yyyy hh:mm a"
      )})`;
    }

    return {
      id: item.id,
      book_name: item.book_name,
      author: item.author,
      copyright_date: item.copyright_date,
      unit_cost: item.unit_cost,
      total_cost: item.total_cost,
      date_requested: format(item.date_requested, "MMM dd, yyyy hh:mm a"),
      status: formattedStage,
      quantity: item.quantity,
      requestor: item.user.first_name + " " + item.user.last_name,
    };
  });

  return (
    <div>
      <div className="flex-col">
        <div className="flex-1 space-y-2 md:p-8 pt-4">
          <PropertiesClient data={formattedRequests} />
        </div>
      </div>
    </div>
  );
};

export default RequestsPage;
