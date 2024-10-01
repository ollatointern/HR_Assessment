import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../constants/DashboardHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const InstructionPage = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/assessment");
  };

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
        <main className="flex-grow flex flex-col items-center justify-center p-8 bg-white mx-4">
          <h1 className="text-4xl font-bold mb-6 text-gray-800">
            Instruction Page:
          </h1>

          {/* Instruction Box */}
          <div className="bg-gray-100 shadow-md rounded-lg p-6 mb-6 w-full max-w-lg">
            <p className="flex items-center mb-4">
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="text-green-600 mr-2"
              />
              In this test, you will encounter a series of statements designed
              to reflect everyday experiences.
            </p>
            <p className="flex items-center mb-4">
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="text-green-600 mr-2"
              />
              There are 100 statements in total, covering a wide range of
              topics. For each statement, you will be presented with five
              options, and your task is to choose the one that most closely
              aligns with your response or perspective.
            </p>
            <p className="flex items-center mb-4">
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="text-green-600 mr-2"
              />
              It's important to note that there are no correct or incorrect
              answers.
            </p>
            <p className="flex items-center mb-4">
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="text-green-600 mr-2"
              />
              Your responses are completely confidential, meaning they will be
              kept private and used exclusively for academic purposes. So, feel
              free to share your thoughts openly and honestly as you progress
              through the test.
            </p>
          </div>

          {/* Ready to Begin Section */}
          <div className="flex  items-center gap-x-4">
            <p className="text-lg font-semibold mb-2">I am ready to begin</p>
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Start the Test
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default InstructionPage;
