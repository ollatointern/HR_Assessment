import { useAuth } from "../contexts/AuthContext";
import { LOGO } from "./utils";
import { FaRegUserCircle } from "react-icons/fa";

const DashboardHeader = () => {
  const { user } = useAuth();

  return (
    <header className="bg-gray-800 text-white fixed top-0 w-full shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <img src={LOGO} alt="Logo" className="object-contain w-32 h-16" />
        <h1 className="text-2xl font-bold">Ollato's Mind Mapping Programme</h1>
        <div className="flex items-center space-x-2">
          <p className="text-lg">{user?.name}</p>
          <FaRegUserCircle className="text-2xl" />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
