import Link from "next/link";
import { Compass, FolderHeart, History, Settings, LogOut } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-card-border bg-background/50 backdrop-blur-xl h-screen flex flex-col fixed left-0 top-0">
      <div className="h-20 flex items-center px-8 border-b border-card-border">
        <Link href="/" className="font-bold tracking-tighter text-xl">
          DIRECTORS<span className="text-muted font-light">MATCH</span>
        </Link>
      </div>
      
      <div className="flex-1 py-8 px-4 flex flex-col gap-2">
        <div className="text-xs font-semibold text-muted tracking-widest uppercase mb-4 px-4">Menu</div>
        
        <NavLink href="/dashboard" icon={<Compass className="w-4 h-4" />}>
          Discover
        </NavLink>
        <NavLink href="/dashboard/collections" icon={<FolderHeart className="w-4 h-4" />}>
          Collections
        </NavLink>
        <NavLink href="/dashboard/history" icon={<History className="w-4 h-4" />}>
          History
        </NavLink>
      </div>
      
      <div className="p-4 border-t border-card-border flex flex-col gap-2">
        <NavLink href="/dashboard/settings" icon={<Settings className="w-4 h-4" />}>
          Settings
        </NavLink>
        <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted hover:text-white hover:bg-white/5 transition-colors w-full text-left">
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}

function NavLink({ href, icon, children }: { href: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <Link 
      href={href}
      className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted hover:text-white hover:bg-white/5 transition-colors"
    >
      {icon}
      {children}
    </Link>
  );
}
