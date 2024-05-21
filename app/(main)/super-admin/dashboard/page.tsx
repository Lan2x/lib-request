"use client";

import { Overview } from "@/components/overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";
import axios from "axios";
import {
  BookCopyIcon,
  CreditCardIcon,
  DollarSign,
  LibraryIcon,
  Package,
  UserSquare,
} from "lucide-react";
import { useEffect, useState } from "react";

interface DashboardPageProps {
  params: { storeId: string };
}
export const revalidate = 0;
const DashboardPage: React.FC<DashboardPageProps> = ({ params }) => {
  const [studentsCount, setStudentsCount] = useState<number>(0);
  const [facultiesCount, setFacultiesCount] = useState<number>(0);
  const [activeStudents, setActiveStudents] = useState<number>(0);
  const [studentsByCourse, setsStudentsByCourse] = useState<number[]>();

  // useEffect(() => {
  //   const getTotalStudents = async () => {
  //     const res = await axios.get(
  //       "/super-admin/dashboard/api/get-total-students/"
  //     );

  //     setStudentsCount(res.data);
  //   };
  //   const getTotalFaculties = async () => {
  //     const res = await axios.get(
  //       "/super-admin/dashboard/api/get-total-faculties/"
  //     );

  //     setFacultiesCount(res.data);
  //   };
  //   const getActiveStudents = async () => {
  //     const res = await axios.get(
  //       "/super-admin/dashboard/api/get-active-students/"
  //     );

  //     setActiveStudents(res.data);
  //   };
  //   const getStudentsByCourse = async () => {
  //     const res = await axios.get(
  //       "/super-admin/dashboard/api/get-students-by-course/"
  //     );

  //     setsStudentsByCourse(res.data);
  //   };

  //   getTotalStudents();
  //   getTotalFaculties();
  //   getActiveStudents();
  //   getStudentsByCourse();
  // }, []);

  return (
    <div className="flex-col w-full">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading
          title="Dashboard"
          description="Overview of the faculties and students"
        />
        <Separator />
        <div className="grid gap-4 grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Students
              </CardTitle>
              <BookCopyIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {/* {formatter.format(totalRevenue)} */}
                {/* {totalBooks} */}
                {studentsCount}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Faculties
              </CardTitle>
              <LibraryIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {/* {totalCategory} */}
                {facultiesCount}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Students who can login
              </CardTitle>
              <UserSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {/* {totalUsers} */}
                {activeStudents}
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Active Users</CardTitle>
            </CardHeader>
            <CardContent>
              <Overview data={studentsByCourse ? studentsByCourse : []} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
