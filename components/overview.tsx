"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface OverviewProps {
  data: any[];
}

export const Overview: React.FC<OverviewProps> = ({ data }) => {
  // let sample = [
  //   { name: "BSIT", total: 32 },
  //   { name: "BSES", total: 12 },
  //   { name: "BSMATH", total: 25 },
  //   { name: "BSMT", total: 20 },
  //   { name: "BSCHEM", total: 30 },
  // ];

  console.info("chart data", data);

  const formattedData = data.map((item) => ({
    name: item.course,
    total: item._count,
  }));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={formattedData}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value} `}
        />
        <Bar dataKey="total" fill="#3498db" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};
