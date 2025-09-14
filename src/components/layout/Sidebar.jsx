// import { useEffect, useState } from "react";
import { Menu, X, Users, Image, FileText, BarChart3, Icon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

export default function Sidebar({
  activeSection,
  onSectionChange,
  onToggleSidebar,
  isOpen,
  windowWidth,
}) {
  const navigate = useNavigate();
  // Collapse automatically on screens < lg

  const toggleSidebar = () => {
    // setIsExpanded(!isExpanded);
    onToggleSidebar(!isOpen);
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

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("tokens");
    navigate("/login");
  };

  return (
    <div
      className={`
      fixed left-0 top-0 min-h-[100vh] bg-sidebar text-sidebar-foreground
      transition-all duration-300 ease-in-out z-50
      ${isOpen ? "w-60" : "w-20"}
      
      shadow-xl border-r border-sidebar-foreground/10
    `}
    >
      {/* Header Section */}
      <div className="p-4 border-b border-sidebar-foreground/20">
        <div className="flex items-center justify-between">
          {/* Logo/Title - only show when expanded */}
          {isOpen && (
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
            aria-label="Toggle sidebar"
            disabled={windowWidth < 1280}
            className={`
              p-2 rounded-lg hover:bg-sidebar-foreground/10 
              text-sidebar-foreground hover:text-white
              transition-colors duration-200
              ${!isOpen ? "mx-auto" : ""}
            `}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="p-4 flex flex-col justify-between min-h-[75vh]">
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
                  ${!isOpen ? "justify-center" : ""}
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
                    isOpen
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-4"
                  }
                  ${!isOpen ? "hidden" : "block"}
                `}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* logout button */}
        <button
          onClick={handleLogout}
          className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg h-12
                  text-left transition-all duration-200 font-semibold text-white hover:bg-sidebar-foreground/10 hover:text-white
                  
                  ${!isOpen ? "justify-center" : ""}
                `}
        >
          {/* <Icon
            size={20}
            className={`
                    flex-shrink-0 transition-all duration-200
                    
                  `}
          /> */}

          <FiLogIn
            size={20}
            className={`
                    flex-shrink-0 transition-all duration-200
                  `}
          />

          {/* Text label - only show when expanded */}
          <span
            className={`
                  transition-all duration-300
                  ${
                    isOpen
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-4"
                  }
                  ${!isOpen ? "hidden" : "block"}
                `}
          >
            Logout
          </span>
        </button>
      </div>
    </div>
  );
}
