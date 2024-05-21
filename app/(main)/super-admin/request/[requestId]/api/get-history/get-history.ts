"use server";

import prismadb from "@/lib/prismadb";

const getHistory = async (requestId: number) => {
  console.log("==============GETTING HISTORY===================");
  console.log(requestId);

  const history = await prismadb.stage.findMany({
    where: {
      requestId: requestId,
    },
  });

  console.log(history);

  return history;
};

export default getHistory;
