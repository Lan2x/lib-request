import prismadb from "@/lib/prismadb";
import PropertiesClient from "./components/client";
import { HistoryColumn } from "./components/columns";
import { format } from "date-fns";

export const revalidate = 0;
const HistoryPage = async ({ params }: { params: { requestId: string } }) => {
  const request = await prismadb.request.findUnique({
    where: {
      id: Number(params.requestId),
    },
    include: {
      Stage: true,
    },
  });

  const formattedRequests: HistoryColumn[] | undefined = request?.Stage.map(
    (item) => {
      return {
        id: item.id,
        stage: item.stage,
        remarks: item.remarks,
        requestId: item.requestId,
        created_at: format(item.created_at, "MMM dd, yyyy hh:mm a"),
      };
    }
  );

  return (
    <div>
      <div className="flex-col">
        <div className="flex-1 space-y-2 md:p-8 pt-4">
          <PropertiesClient
            data={formattedRequests ? formattedRequests : []}
            requestId={params.requestId}
          />
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
