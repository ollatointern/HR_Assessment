import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Access the AuthContext

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // Use user and logout function from AuthContext
  console.log(user);

  const handleLogout = () => {
    logout(); // Call the logout function from context
    navigate("/login"); // Navigate to the login page
  };

  useEffect(() => {
    // You can add any logic here that you want to execute when the component mounts
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-4">
        Hello, {user?.name}! Welcome to the Dashboard
      </h1>
      <button
        onClick={handleLogout}
        className="mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
