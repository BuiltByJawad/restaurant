import { DashboardSidebar } from "@/components/dashboard/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardSidebar />
      <div className="ml-64 flex flex-col min-h-screen">
        {children}
      </div>
    </div>
  );
}
