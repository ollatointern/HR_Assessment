import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../constants/DashboardHeader";
import { packages } from "../constants/PackagesData";
import { AiOutlineCheck, AiOutlineCreditCard } from "react-icons/ai";

const Packages = () => {
  const navigate = useNavigate();
  const handleBookSession = () => {
    navigate("/booksession");
  };
  const handleClick = () => {
    navigate("/payment");
  };

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
            <h1 className="text-4xl font-bold mb-6 text-gray-800">Packages</h1>
            <div className="flex h-[600px] justify-evenly gap-6">
              {packages.map((card) => (
                <div
                  key={card.id}
                  className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between h-[600px]"
                >
                  <div>
                    <h6 className="text-xl font-semibold mb-2">{card.title}</h6>
                    <p className="text-lg font-medium text-red-500 mb-2">
                      Price: <span className="font-bold">{card.price}</span>
                    </p>
                    <p className="text-base text-gray-700 mb-2">
                      Tax: <span className="font-bold">{card.tax}</span>
                    </p>
                    <ol className="list-none p-0 mt-4 space-y-2">
                      {card.suitedFor.map((list, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 text-gray-600"
                        >
                          <AiOutlineCheck className="h-4 w-4 text-green-500" />
                          {list}
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Button aligned to bottom */}
                  <button
                    className="mt-auto bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-blue-600 mb-2 p-2"
                    onClick={handleClick}
                  >
                    Get Started Now
                    <AiOutlineCreditCard className="ml-2 text-xl text-cyan-400" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add ons section */}
            <h5 className="text-2xl font-bold mt-8 mb-4">Add ons.</h5>
            <div className="flex gap-[350px]">
              <div className="bg-white shadow-lg rounded-lg p-6 ml-14 pl-14">
                <h6 className="text-xl font-semibold mb-2">
                  Virtual Counseling
                </h6>
                <p className="text-base mb-2">
                  60 minutes <span className="font-bold">₹1500/ Session.</span>
                </p>
                <button
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  onClick={handleBookSession}
                >
                  Book Session
                </button>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h6 className="text-xl font-semibold mb-2">
                  In-person Counseling
                </h6>
                <p className="text-base mb-2">
                  60 minutes <span className="font-bold">₹2500/ Session.</span>
                </p>
                <button
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  onClick={handleBookSession}
                >
                  Book Session
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Packages;
