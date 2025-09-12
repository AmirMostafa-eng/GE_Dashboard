import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import Sidebar from "@/components/layout/Sidebar";
import UsersPage from "./users/UsersPage";
import BannersPage from "./banners/BannersPage";
import ExamsPage from "./exams/ExamsPage";
import { Toaster } from "react-hot-toast";

export default function Dashboard() {
  const [page, setPage] = useState("users");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const navigate = useNavigate();
  const checkingUser = () => {
    const userLocal = localStorage.getItem("user");
    const userSession = sessionStorage.getItem("user");
    const user = userLocal || userSession;
    if (user) {
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
            backgroundImage:
              "url('/A friendly cartoon-style character in flat vector illustration, standing on.jpg')",
          }}
        >
          {/* <img src="/A friendly cartoon-style character in flat vector illustration, standing on.jpg" /> */}
          <Button
            onClick={() => navigate("/login")}
            className="mt-40 text-white font-semibold text-xl cursor-pointer"
            variant="transparent"
          >
            <FiLogIn className="" /> Login
          </Button>
        </div>
      )}
    </div>
  );
}
