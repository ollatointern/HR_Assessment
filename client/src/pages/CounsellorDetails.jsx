import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../constants/DashboardHeader";
import axios from "axios";

const CounsellorDetails = () => {
  const [details, setDetails] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAvailability = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/counsellors/256"
        );
        console.log("API response status:", response.status);
        if (response.data) {
          console.log(response.data);
          setDetails(response.data);
        }
      } catch (error) {
        console.log("Can't find user details", error);
      }
    };
    getAvailability();
  }, []);

  // Function to book a session
  const handleBookSession = async () => {
    // Check if details are available
    if (!details) {
      alert("Counsellor details are not loaded yet.");
      return;
    }

    const studentId = JSON.parse(localStorage.getItem("user")).id; // Retrieve student ID from local storage

    // Prepare booking details
    const bookingDetails = {
      counsellorId: details.id, // Ensure this matches the API response
      b_time_slot: details.time_slot || "09:00:00", // Default time slot if not available
      b_date: details.date || "2024-10-02", // Default date if not available
      b_mode: details.mode || "Online", // Default mode if not available
      b_duration: details.duration || "60", // Default duration if not available
      student_id: studentId, // Student ID
      session_link: "https://session-link.com", // Default session link
    };

    console.log("Booking Details:", bookingDetails); // Log booking details for debugging

    try {
      const response = await axios.post(
        "http://localhost:5000/api/sessions/book",
        bookingDetails
      );
      console.log("Booking response:", response.data);
      setBookingSuccess(true); // Set success state
      setError(null); // Reset error state
    } catch (err) {
      console.error("Error booking session:", err);
      setError("Error booking session. Please try again."); // Set error message
    }
  };

  // If details are not loaded yet
  if (!details) {
    return <p>Loading...</p>;
  }

  // Format date and time
  const formattedDate = new Date(details.date).toLocaleDateString();
  const formattedTime = details.time_slot.slice(0, 5); // Show HH:MM only

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
            <h1 className="text-2xl font-bold mb-6 text-gray-800">
              Counsellor Availability Details:
            </h1>
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <h2 className="text-xl font-bold mb-4">{details.full_name}</h2>
              <p className="mb-2">
                <strong>Date:</strong> {formattedDate}
              </p>
              <p className="mb-2">
                <strong>Time Slot:</strong> {formattedTime}
              </p>
              <p className="mb-2">
                <strong>Mode:</strong> {details.mode}
              </p>
              <p className="mb-2">
                <strong>Duration:</strong> {details.duration} minutes
              </p>
              {/* Styled Button */}
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-4"
                onClick={handleBookSession}
              >
                Book Session
              </button>

              {/* Success or Error Message */}
              {bookingSuccess && (
                <p className="mt-4 text-green-600">
                  Session booked successfully!
                </p>
              )}
              {error && <p className="mt-4 text-red-600">{error}</p>}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CounsellorDetails;
