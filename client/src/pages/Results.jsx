import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../constants/DashboardHeader";
import axios from "axios";

const Results = () => {
  const [results, setResults] = useState({});
  const userResult = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    // Fetch the results using the user ID
    const fetchResults = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/auth/user/${userResult.id}`
        );
        setResults(response.data); // Set the whole result object
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };

    fetchResults();
  }, [userResult.id]);

  // Calculate total marks
  const totalMarks = Object.values(results).reduce(
    (acc, score) => acc + score,
    0
  );

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
            <div className="results-page">
              <h2 className="text-2xl font-bold mb-4 text-center">
                HR Assessment Results for {userResult.name}
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg">
                  <thead>
                    <tr className="bg-gray-200 text-gray-800">
                      <th className="py-3 px-4 border-b text-center">Domain</th>
                      <th className="py-3 px-4 border-b text-center">
                        Marks Obtained
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(results).length > 0 ? (
                      Object.entries(results).map(([domain, score]) => (
                        <tr
                          key={domain}
                          className="hover:bg-gray-50 transition duration-200"
                        >
                          <td className="py-2 px-4 border-b text-center">
                            {domain}
                          </td>
                          <td className="py-2 px-4 border-b text-center">
                            {score}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="2" className="py-2 px-4 text-center">
                          No results found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                  <tfoot>
                    <tr className="bg-gray-200 text-gray-800 font-bold">
                      <td className="py-2 px-4 border-t text-center">
                        Total Marks
                      </td>
                      <td className="py-2 px-4 border-t text-center">
                        {totalMarks}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Results;
