import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../constants/DashboardHeader";
import axios from "axios";

const SessionManagement = () => {
  const [sessions, setSessions] = useState([]); // Array of sessions
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null); // For session to cancel

  const studentId = JSON.parse(localStorage.getItem("user")).id;

  useEffect(() => {
    const fetchBookedSessions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/sessions/get-sessions/${studentId}`
        );

        setSessions(response.data); // Store the fetched sessions
      } catch (err) {
        console.error("Error fetching booked sessions:", err);
        setError("Error fetching booked sessions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookedSessions();
  }, [studentId]); // Dependency array with studentId

  // Function to handle the cancel button click
  const handleCancel = (session) => {
    setSelectedSession(session); // Set session to cancel
    setShowModal(true); // Show modal
  };

  // Close the modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedSession(null); // Clear selected session
  };

  // Confirm the session cancellation
  const confirmCancel = async () => {
    try {
      // API call to cancel the session
      await axios.post(
        `http://localhost:5000/api/sessions/cancel-session/${selectedSession.session_id}`
      );

      console.log("Session cancelled successfully!");

      // Refetch sessions to update the UI
      await fetchBookedSessions(); // Call the fetch function to update the session state
    } catch (error) {
      console.error("Error cancelling session:", error);
    } finally {
      closeModal(); // Close modal after cancellation
    }
  };

  // Refetch sessions function
  const fetchBookedSessions = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/sessions/get-sessions/${studentId}`
      );
      setSessions(response.data); // Store the fetched sessions
    } catch (err) {
      console.error("Error fetching booked sessions:", err);
      setError("Error fetching booked sessions. Please try again later.");
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  if (error) {
    return <div>{error}</div>; // Display error message
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
          <h1 className="text-4xl font-bold mb-6 text-gray-800">
            Session Management
          </h1>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="py-2 px-4 border">Session Id</th>
                <th className="py-2 px-4 border">Counsellor Id</th>
                <th className="py-2 px-4 border">Mode</th>
                <th className="py-2 px-4 border">Duration</th>
                <th className="py-2 px-4 border">Date</th>
                <th className="py-2 px-4 border">Time</th>
                <th className="py-2 px-4 border">Status</th>
                <th className="py-2 px-4 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session) => (
                <tr className="text-center" key={session.session_id}>
                  <td className="py-2 px-4 border">{session.session_id}</td>
                  <td className="py-2 px-4 border">{session.counsellor_id}</td>
                  <td className="py-2 px-4 border">{session.b_mode}</td>
                  <td className="py-2 px-4 border">{session.b_duration}</td>
                  <td className="py-2 px-4 border">
                    {new Date(session.b_date).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border">{session.b_time_slot}</td>
                  <td className="py-2 px-4 border">{session.status}</td>
                  <td className="py-2 px-4 border">
                    <button
                      className={`${
                        session.status === "cancelled"
                          ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                          : "bg-red-500 text-white hover:bg-red-600"
                      } px-3 py-1 rounded`}
                      onClick={
                        session.status === "cancelled"
                          ? null // Disable the button if status is cancelled
                          : () => handleCancel(session) // Call handleCancel if not cancelled
                      }
                      disabled={session.status === "cancelled"} // Disable button when status is cancelled
                    >
                      {session.status === "cancelled" ? "Cancelled" : "Cancel"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Modal for cancellation confirmation */}
          {showModal && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
              <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Are you sure you want to cancel this session?
                </h2>
                <div className="flex justify-end">
                  <button
                    className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
                    onClick={closeModal}
                  >
                    No
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={confirmCancel}
                  >
                    Yes, Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SessionManagement;
