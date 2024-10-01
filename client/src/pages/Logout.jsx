import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate(); // Hook to navigate after logout

  const handleLogout = () => {
    logout(); // Call the logout function
    navigate("/login"); // Redirect to the login page after logging out
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
    >
      Logout
    </button>
  );
};

export default Logout;
