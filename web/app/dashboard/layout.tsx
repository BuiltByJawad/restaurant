import { DashboardSidebar } from "@/components/dashboard/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardSidebar />
      <div className="flex flex-col min-h-screen pb-20 lg:ml-64 lg:pb-0">
        {children}
      </div>
    </div>
  );
}
