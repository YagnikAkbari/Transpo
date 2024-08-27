import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Toaster from "./components/common/Toaster/Toaster";
import { ToastProvider } from "react-toast-notifications";

const MainLayout = () => {
  return (
    <ToastProvider>
      <Toaster />
      <Navbar />
      <Outlet />
    </ToastProvider>
  );
};

export default MainLayout;
