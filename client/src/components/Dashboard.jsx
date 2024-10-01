import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext"; // Access the AuthContext
import DashboardHeader from "../constants/DashboardHeader";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  const { user } = useAuth(); // Use user and logout function from AuthContext
  const userId = user ? user.id : null;
  console.log(userId);
  console.log(user);

  useEffect(() => {
    // You can add any logic here that you want to execute when the component mounts
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Dashboard Header */}
      <DashboardHeader />

      {/* Main Dashboard Content */}
      <div className="flex flex-grow mt-20">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-100 h-full overflow-y-auto p-4">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-grow p-8">
          <h1 className="text-4xl font-bold mb-6 text-gray-800">
            Hello, {user?.name}! Welcome to the Dashboard
          </h1>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
