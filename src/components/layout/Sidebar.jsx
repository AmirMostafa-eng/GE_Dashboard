import { useEffect, useState } from "react";
import { Menu, X, Users, Image, FileText, BarChart3, Icon } from "lucide-react";

export default function Sidebar({ activeSection, onSectionChange }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Collapse automatically on screens < lg
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth < 1280) {
        setIsExpanded(false);
      } else {
        setIsExpanded(true);
      }
    };

    // Run once on mount
    handleResize();

    // Attach resize listener
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const menuItems = [
    {
      id: "users",
      label: "Users",
      icon: Users,
      active: activeSection === "users",
    },
    {
      id: "banners",
      label: "Banners",
      icon: Image,
      active: activeSection === "banners",
    },
    {
      id: "exams",
      label: "Exams",
      icon: FileText,
      active: activeSection === "exams",
    },
  ];

  const IconDashboard = BarChart3;

  return (
    <div
      className={`
      relative left-0 top-0 min-h-[100vh] bg-sidebar text-sidebar-foreground
      transition-all duration-300 ease-in-out z-50
      ${isExpanded ? "w-64" : "w-20"}
      shadow-xl border-r border-sidebar-foreground/10
    `}
    >
      {/* Header Section */}
      <div className="p-4 border-b border-sidebar-foreground/20">
        <div className="flex items-center justify-between">
          {/* Logo/Title - only show when expanded */}
          {isExpanded && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center">
                <span className="text-white text-sm font-bold">
                  <IconDashboard size={20} />
                </span>
              </div>
              <div>
                <h1 className="text-white font-semibold text-lg">PrufCoach</h1>
              </div>
            </div>
          )}

          {/* Hamburger Menu Button */}
          <button
            onClick={toggleSidebar}
            disabled={windowWidth <= 1280}
            className={`
              p-2 rounded-lg hover:bg-sidebar-foreground/10 
              text-sidebar-foreground hover:text-white
              transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed
              ${!isExpanded ? "mx-auto " : ""}
            `}
          >
            {/* {isExpanded ? <X size={20} /> : } */}
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="p-4">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg h-12
                  text-left transition-all duration-200 font-semibold 
                  ${
                    item.active
                      ? "bg-sidebar-foreground text-foreground shadow-sm"
                      : "text-white hover:bg-sidebar-foreground/10 hover:text-white"
                  }
                  ${!isExpanded ? "justify-center" : ""}
                `}
              >
                <Icon
                  size={20}
                  className={`
                    flex-shrink-0 transition-all duration-200
                    ${item.active ? "text-sidebar" : ""}
                  `}
                />

                {/* Text label - only show when expanded */}
                <span
                  className={`
                  transition-all duration-300
                  ${
                    isExpanded
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-4"
                  }
                  ${!isExpanded ? "hidden" : "block"}
                `}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
