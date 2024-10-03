import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { counsellers } from "../constants/Counsellers";
import DashboardHeader from "../constants/DashboardHeader";

const BookSession = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [selectedExpertise, setSelectedExpertise] = useState("All"); // State for selected expertise

  // Filtered counsellors based on search term and expertise
  const filteredCounsellors = counsellers.filter((counsellor) => {
    const nameMatches = counsellor.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const expertiseMatches =
      selectedExpertise === "All" ||
      counsellor.expertise.some((exp) =>
        exp.toLowerCase().includes(selectedExpertise.toLowerCase())
      );
    return nameMatches && expertiseMatches;
  });

  return (
    <div>
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
              Book Session
            </h1>
            <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
              <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
                Book Session
              </h1>

              {/* Filter Buttons */}
              <div className="mb-4 flex gap-4 justify-center">
                <button
                  className={`bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-200 ${
                    selectedExpertise === "All" ? "bg-blue-700" : ""
                  }`}
                  onClick={() => setSelectedExpertise("All")}
                >
                  All
                </button>
                <button
                  className={`bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-200 ${
                    selectedExpertise === "Career Counsellor"
                      ? "bg-blue-700"
                      : ""
                  }`}
                  onClick={() => setSelectedExpertise("Career Counsellor")}
                >
                  Career Counsellor
                </button>
                <button
                  className={`bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-200 ${
                    selectedExpertise === "Psychologist" ? "bg-blue-700" : ""
                  }`}
                  onClick={() => setSelectedExpertise("Psychologist")}
                >
                  Psychologist
                </button>
                <button
                  className={`bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-200 ${
                    selectedExpertise === "Group Counsellor"
                      ? "bg-blue-700"
                      : ""
                  }`}
                  onClick={() => setSelectedExpertise("Group Counsellor")}
                >
                  Group Counsellor
                </button>
              </div>

              {/* Search Counsellor */}
              <div className="mb-6 flex justify-center">
                <input
                  type="text"
                  placeholder="Search Counsellor Name"
                  className="p-3 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500 w-full md:w-1/2"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Counsellors List */}
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                  Available Counsellors
                </h2>

                {filteredCounsellors.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {filteredCounsellors.map((counsellor) => (
                      <div
                        key={counsellor.id}
                        className="border rounded-lg p-4 shadow-md hover:shadow-lg transition duration-200"
                      >
                        <h3 className="text-xl font-semibold text-gray-700">
                          {counsellor.name}
                        </h3>
                        <p className="text-gray-500">
                          Expertise: {counsellor.expertise.join(", ")}
                        </p>
                        <p className="text-gray-500">
                          Experience: {counsellor.experience}
                        </p>
                        <p className="text-gray-500">
                          Languages: {counsellor.language}
                        </p>
                        <p className="text-gray-500">
                          Location: {counsellor.location}
                        </p>
                        <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 transition duration-200">
                          Book Now
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center">
                    No counsellor found
                  </p>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default BookSession;
