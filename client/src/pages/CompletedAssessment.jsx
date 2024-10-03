import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../constants/DashboardHeader";
import { useAuth } from "../contexts/AuthContext";

const CompletedAssessment = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = () => {
    // Add your logic here
    navigate("/results");
  };

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
        <main className="flex-grow p-8 bg-white shadow-lg rounded-lg mx-6 my-4">
          <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            Congratulations... You Have Successfully Completed The Assessment!!!
            <br />
            <span className="text-3xl font-bold text-gray-700 pt-2 mt-4">
              {user?.name}
            </span>
          </h1>
          <p className="text-center text-lg mb-4">
            Click below to view your Results
          </p>
          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition duration-200"
            >
              View Results
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CompletedAssessment;
