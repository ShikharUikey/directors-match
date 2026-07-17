import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="ml-64 p-8 min-h-screen relative z-10">
        {/* Cinematic gradient blob for dashboard */}
        <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[100px] pointer-events-none -z-10" />
        {children}
      </main>
    </div>
  );
}
