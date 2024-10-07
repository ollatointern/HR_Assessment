import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../constants/DashboardHeader";
import axios from "axios";

const MyActivity = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const studentId = JSON.parse(localStorage.getItem("user")).id; // Get student ID from local storage

  useEffect(() => {
    const fetchBookedSessions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/activity/sessions/${studentId}`
        );

        if (Array.isArray(response.data)) {
          setSessions(response.data);
          console.log(response.data);
        } else {
          setSessions([]);
        }
      } catch (err) {
        console.error("Error fetching booked sessions:", err);
        setError("Error fetching booked sessions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookedSessions();
  }, [studentId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading sessions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

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
          <h1 className="text-2xl font-bold mb-6 text-gray-800">
            Booked Sessions
          </h1>
          <div className="bg-white p-6 shadow-lg rounded-lg">
            {sessions.length > 0 ? (
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="text-center">
                    <th className="py-2">Sr No</th>
                    <th className="py-2">Session ID</th>
                    <th className="py-2">Counsellor ID</th>
                    <th className="py-2">Appointment Date</th>
                    <th className="py-2">Mode</th>
                    <th className="py-2">Duration</th>
                    <th className="py-2">Time Slot</th>
                  </tr>
                </thead>
                <tbody>
                  {sessions.map((session, index) => (
                    <tr
                      key={session.session_id}
                      className="border-b text-center"
                    >
                      <td className="py-2">{index + 1}</td>
                      <td className="py-2">{session.session_id}</td>
                      <td className="py-2">{session.counsellor_id}</td>
                      <td className="py-2">
                        {new Date(session.b_date).toLocaleDateString()}
                      </td>
                      <td className="py-2 capitalize">{session.b_mode}</td>
                      <td className="py-2">{session.b_duration} minutes</td>
                      <td className="py-2">{session.b_time_slot}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No sessions booked yet.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MyActivity;
