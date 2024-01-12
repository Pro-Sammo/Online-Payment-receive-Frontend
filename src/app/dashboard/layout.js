import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "Dashboard",
  description: "This is dashboard page",
};

export default function DashboardLayout({ children }) {
  return (
    <div className="h-[90vh]  overflow-hidden flex scrollbar-hide">
      <div className="h-full overflow-y-auto">
        <Sidebar />
      </div>
      <div className="w-[85vw] h-full overflow-y-auto">{children}</div>
    </div>
  );
}
