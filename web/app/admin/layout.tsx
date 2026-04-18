import { AdminSidebar } from "@/components/dashboard/admin-sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <AdminSidebar />
      <div className="flex flex-col min-h-screen pb-20 lg:ml-64 lg:pb-0">
        {children}
      </div>
    </div>
  );
}
