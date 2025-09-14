import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import UsersPage from "./users/UsersPage";
import BannersPage from "./banners/BannersPage";
import ExamsPage from "./exams/ExamsPage";
import { Toaster } from "react-hot-toast";
import { BiSolidLogIn } from "react-icons/bi";
import { CircleArrowRight } from "lucide-react";

export default function Dashboard() {
  const [page, setPage] = useState("users");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const navigate = useNavigate();
  const checkingUser = () => {
    // const userLocal = localStorage.getItem("user");
    const userSession = sessionStorage.getItem("user");
    // const user = userLocal || userSession;
    if (userSession) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      if (width < 1280) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    // Run once on mount
    handleResize();

    // Attach resize listener
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Add overlay for mobile when sidebar is open
  // const handleOverlayClick = () => {
  //   if (windowWidth < 1280) {
  //     setIsSidebarOpen(false);
  //   }
  // };

  return (
    <div>
      {/* Authenticated view with sidebar and main content */}
      {checkingUser() ? (
        <div className="relative min-h-screen">
          {/* Overlay for mobile */}
          {/* {windowWidth < 1280 && isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-40 transition-opacity"
              onClick={handleOverlayClick}
            />
          )} */}

          <Sidebar
            activeSection={page}
            onSectionChange={setPage}
            onToggleSidebar={setIsSidebarOpen}
            isOpen={isSidebarOpen}
            windowWidth={windowWidth}
          />
          <main
            className={`min-h-screen bg-gray-50 transition-all duration-300 pb-6
            ${
              windowWidth >= 1280
                ? isSidebarOpen
                  ? "ml-60"
                  : "ml-20"
                : "ml-20"
            }`}
          >
            {page === "users" && <UsersPage />}
            {page === "banners" && <BannersPage />}
            {page === "exams" && <ExamsPage />}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: "#fff",
                  color: "#333",
                },
                success: {
                  style: {
                    background: "#4CAF50",
                    color: "white",
                  },
                },
                error: {
                  style: {
                    background: "#F44336",
                    color: "white",
                  },
                },
              }}
            />
          </main>
        </div>
      ) : (
        <div
          className="flex flex-col items-center justify-center bg-cover bg-center"
          style={{
            height: "100vh",
            // backgroundImage:
            //   "url('/A friendly cartoon-style character in flat vector illustration, standing on.jpg')",
            backgroundColor: "#DFEBD3",
          }}
        >
          {/* <img src="/A friendly cartoon-style character in flat vector illustration, standing on.jpg" /> */}
          <div
            onClick={() => navigate("/login")}
            className="text-white cursor-pointer"
            variant="transparent"
          >
            <img
              src="/public/A_friendly_cartoon-style_character_in_flat_vector_illustration__standing_on-removebg-preview.png"
              alt="login"
              srcset=""
              className="hover:drop-shadow-2xl transition-all duration-200"
            />
          </div>
        </div>
      )}
    </div>
  );
}
