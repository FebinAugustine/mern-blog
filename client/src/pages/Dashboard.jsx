import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    // console.log(tabFromUrl);
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row dark:bg-gray-700 dark:text-white">
      {/* Sidebar */}
      <div className="md:min-w-56">
        <DashSidebar />
      </div>
      {/* Main Content */}
      <div className=" max-w-lg w-full mx-auto">
        {tab === "profile" && <DashProfile />}
      </div>
    </div>
  );
}
