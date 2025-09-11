import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import Sidebar from "@/components/layout/Sidebar";
import UsersPage from "./users/UsersPage";
import BannersPage from "./banners/BannersPage";
import ExamsPage from "./exams/ExamsPage";
import { Toaster } from "react-hot-toast";

export default function Dashboard() {
  const [page, setPage] = useState("banners");

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

  return (
    <div>
      {/* Authenticated view with sidebar and main content */}
      {checkingUser() ? (
        <div className="flex min-h-screen">
          <Sidebar activeSection={page} onSectionChange={setPage} />
          <main className="flex-1 bg-gray-50 max-w-[calc(100%-80px)] xl:max-w-full min-h-screen pb-6">
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
