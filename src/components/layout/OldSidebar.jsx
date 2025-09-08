import { useEffect, useState } from "react";
import { Menu, Users, Image as BannerIcon, FileText } from "lucide-react";

// type PageKey = "users" | "banners" | "exams";
export default function Sidebar({ active, onChange, initialOpen = true }) {
  const [isOpen, setIsOpen] = useState(() => {
    // persist collapsed/expanded state across reloads
    const stored = localStorage.getItem("sidebar:isOpen");
    return stored === null ? initialOpen : stored === "true";
  });

  useEffect(() => {
    localStorage.setItem("sidebar:isOpen", String(isOpen));
  }, [isOpen]);

  const navItems = [
    { key: "users", label: "Users", icon: Users },
    { key: "banners", label: "Banners", icon: BannerIcon },
    { key: "exams", label: "Exams", icon: FileText },
  ];

  return (
    <aside
      aria-label="Sidebar"
      aria-expanded={isOpen}
      className={`h-screen bg-green-900 text-white transition-[width] duration-300 ease-in-out
        ${isOpen ? "w-64" : "w-20"} flex flex-col shadow-lg`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-4 border-b border-green-800">
        {isOpen && (
          <span className="font-semibold text-lg select-none">Dashboard</span>
        )}
        <button
          aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
          onClick={() => setIsOpen((v) => !v)}
          className="p-2 rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-white/30"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Nav buttons (not links) */}
      <nav className="flex-1 py-3 space-y-1">
        {navItems.map(({ key, label, icon: Icon }) => {
          const isActive = active === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onChange?.(key)}
              title={!isOpen ? label : undefined} // tooltip when collapsed
              className={`group w-full flex items-center gap-3 px-3 py-2 mx-2 rounded-md
                transition-colors focus:outline-none focus:ring-2 focus:ring-white/20
                ${
                  isActive
                    ? "bg-green-700 text-white"
                    : "text-gray-200 hover:bg-green-800"
                }`}
            >
              <Icon
                className={`h-5 w-5 flex-shrink-0
                ${
                  isActive
                    ? "text-white"
                    : "text-gray-100 group-hover:text-white"
                }`}
              />
              {/* Render text only when expanded */}
              {isOpen && <span className="truncate">{label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Footer (optional) */}
      <div className="p-3 text-xs text-green-200/80">
        {isOpen ? "© Dashboard" : "©"}
      </div>
    </aside>
  );
}
