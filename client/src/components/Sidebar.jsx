import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="h-full overflow-y-scroll bg-gray-100 p-4">
      {/* Full height and scrollable */}
      <NavLink
        className={({ isActive }) =>
          `block mb-4 p-2 rounded transition-colors duration-200 ${
            isActive
              ? "bg-blue-500 text-white"
              : "text-gray-700 hover:bg-blue-100"
          }`
        }
        to={"/dashboard"}
      >
        Dashboard
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `block mb-4 p-2 rounded transition-colors duration-200 ${
            isActive
              ? "bg-blue-500 text-white"
              : "text-gray-700 hover:bg-blue-100"
          }`
        }
        to={"/packages"}
      >
        Packages
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `block mb-4 p-2 rounded transition-colors duration-200 ${
            isActive
              ? "bg-blue-500 text-white"
              : "text-gray-700 hover:bg-blue-100"
          }`
        }
        to={"/language"}
      >
        Assessment
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `block mb-4 p-2 rounded transition-colors duration-200 ${
            isActive
              ? "bg-blue-500 text-white"
              : "text-gray-700 hover:bg-blue-100"
          }`
        }
        to={"/downloadsummary"}
      >
        Download Summary
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `block mb-4 p-2 rounded transition-colors duration-200 ${
            isActive
              ? "bg-blue-500 text-white"
              : "text-gray-700 hover:bg-blue-100"
          }`
        }
        to={"/report"}
      >
        Report
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `block mb-4 p-2 rounded transition-colors duration-200 ${
            isActive
              ? "bg-blue-500 text-white"
              : "text-gray-700 hover:bg-blue-100"
          }`
        }
        to={"/booksession"}
      >
        Book Session
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `block mb-4 p-2 rounded transition-colors duration-200 ${
            isActive
              ? "bg-blue-500 text-white"
              : "text-gray-700 hover:bg-blue-100"
          }`
        }
        to={"/sessionmanagement"}
      >
        Session Management
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `block mb-4 p-2 rounded transition-colors duration-200 ${
            isActive
              ? "bg-blue-500 text-white"
              : "text-gray-700 hover:bg-blue-100"
          }`
        }
        to={"/myactivity"}
      >
        My Activity
      </NavLink>
      <button
        onClick={handleSubmit}
        className="mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-200"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
