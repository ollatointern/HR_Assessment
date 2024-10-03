import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../constants/DashboardHeader";

const Language = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    // Check if a language is selected
    if (selectedLanguage) {
      navigate("/instructionpage");
    } else {
      alert("Please select a language before proceeding."); // Alert user to select a language
    }
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
        <main className="flex-grow flex flex-col items-center justify-center p-8">
          <h1 className="text-4xl font-bold mb-6 text-gray-800">
            Language Preference
          </h1>
          <p className="text-red-600 text-2xl mb-2">Remember</p>
          <p className="text-gray-700 text-center mb-4">
            You can select only one language, and you will receive the report in
            the chosen language.
          </p>
          <select
            required
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)} // Update state on change
            className="border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Language</option>
            <option value="en">English</option>
            <option value="mr">Marathi</option>
            <option value="hn">Hindi</option>
            <option value="gr">Gujarati</option>
          </select>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Proceed
          </button>
        </main>
      </div>
    </div>
  );
};

export default Language;
