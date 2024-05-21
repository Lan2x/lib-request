"use server";

import prismadb from "@/lib/prismadb";
import { format } from "date-fns";

const getHistory = async (requestId: number) => {
  console.log("==============GETTING HISTORY===================");
  console.log(requestId);

  const history = await prismadb.stage.findMany({
    where: {
      requestId: requestId,
    },
  });

  console.log(history);

  const formattedHistory = history.map((item) => {
    return {
      title: format(item.created_at, "MMM dd, yyyy hh:mm a"),
      cardTitle: item.stage,
      cardSubtitle: item.remarks,
    };
  });

  return formattedHistory;
};

export default getHistory;
