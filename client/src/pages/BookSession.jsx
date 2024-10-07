import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../constants/DashboardHeader";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BookSession = () => {
  const [counsellor, setCounsellor] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/counsellorsDetails");
  };

  useEffect(() => {
    const fetchCounsellor = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/counsellors/256"
        );
        // console.log("API response status:", response.status); // Log status
        // console.log("API response data:", response.data); // Log the data
        if (response.data) {
          setCounsellor(response.data); // Set the counsellor state
        } else {
          console.log("No counsellor found");
        }
      } catch (error) {
        console.log("Cannot get Counsellor", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCounsellor();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <DashboardHeader />
      <div className="flex flex-grow mt-20">
        <aside className="w-64 bg-gray-200 h-screen overflow-y-auto p-4 shadow-lg">
          <Sidebar />
        </aside>
        <main className="flex-grow p-8 bg-white shadow-lg rounded-lg">
          <div className="container mx-auto p-4 pt-6">
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <h1 className="text-2xl font-bold mb-4">
                {counsellor.full_name}
              </h1>
              <p>Email: {counsellor.email_address}</p>
              <p>Gender: {counsellor.gender}</p>
              <p>
                Professional Expertise:{" "}
                {counsellor.professional_expertise.split(", ").join(", ")}
              </p>
              <p>Age: {counsellor.age}</p>
              <p>Total Experience: {counsellor.total_experience} years</p>
              <p>State: {counsellor.state}</p>
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 pt-2 mt-2"
                onClick={handleClick}
              >
                Book Now
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BookSession;
