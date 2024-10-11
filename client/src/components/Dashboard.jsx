import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext"; // Access the AuthContext
import DashboardHeader from "../constants/DashboardHeader";
import Sidebar from "./Sidebar";
import { NavLink } from "react-router-dom";
import { FaUser } from "react-icons/fa"; // React icon

const Dashboard = () => {
  const { user } = useAuth(); // Use user and logout function from AuthContext
  const userId = user ? user.id : null;
  console.log(userId);
  console.log(user);

  useEffect(() => {
    // Logic when the component mounts
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Dashboard Header */}
      <DashboardHeader />

      {/* Main Dashboard Content */}
      <div className="flex flex-grow mt-20">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-100 h-full overflow-y-auto p-4 shadow-lg">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-grow p-8 mt-10">
          {/* Container for text and icon */}
          <div className="flex justify-between items-start mb-8 bg-white p-8 rounded-lg shadow-lg">
            {/* Left section: Text */}
            <div className="max-w-2xl">
              <h1 className="text-3xl font-bold mb-4 text-gray-800">
                Dear {user.name}
              </h1>
              <p className="mb-4 text-lg text-gray-600">
                Welcome to our Mind Mapping Program for students,
              </p>
              <p className="mb-4 text-gray-600 leading-relaxed">
                Please carefully review the following instructions. Completing
                this test will require a minimum of one hour of your time. At
                Ollato, we prioritize your well-being as a fundamental
                component. Field experts have meticulously crafted our
                assessment test to offer you a precise evaluation of your
                strengths and weaknesses status. Upon finishing the test, you
                will receive a comprehensive 17-page report. Following this, you
                can schedule a session for expert guidance.
              </p>
              <p className="mb-4 text-gray-600 font-semibold">
                Wish You All The Best!
              </p>
              <p className="font-semibold text-gray-700">Team Ollato</p>
            </div>

            {/* Right section: React icon */}
            <div className="flex items-center justify-center bg-gray-200 p-6 rounded-lg shadow-md mr-8">
              <FaUser className="text-8xl text-gray-600" />
            </div>
          </div>

          {/* Links section - Step by Step Process */}
          <div className="flex flex-col mt-15 bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              PROCESS
            </h2>
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <NavLink
                to={"/packages"}
                className="flex-1 p-4 text-center bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all"
              >
                Select Package
              </NavLink>
              <NavLink
                to={"/payment"}
                className="flex-1 p-4 text-center bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all"
              >
                Make Payment
              </NavLink>
              <NavLink
                to={"/language"}
                className="flex-1 p-4 text-center bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all"
              >
                Give Assessment
              </NavLink>
              <NavLink
                to={"/downloadsummary"}
                className="flex-1 p-4 text-center bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all"
              >
                Detailed Report
              </NavLink>
              <NavLink
                to={"/booksession"}
                className="flex-1 p-4 text-center bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all"
              >
                Book Counselling
              </NavLink>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
