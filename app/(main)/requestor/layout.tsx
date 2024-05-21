import Sidebar from "@/components/ui/sidebar";
import { menuItems } from "./components/menu-items";

export default function TollGateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="h-screen flex flex-row justify-start">
        <Sidebar accountType="Requestor" menuItems={menuItems} />
        <div className="flex-1 flex-grow overflow-y-auto bg-gray-100 p-4 text-black">
          {children}
        </div>
      </div>
    </>
  );
}
