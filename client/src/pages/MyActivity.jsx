import Sidebar from "../components/Sidebar";
import DashboardHeader from "../constants/DashboardHeader";

const MyActivity = () => {
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
            <h1 className="text-4xl font-bold mb-6 text-gray-800">
              Download Summary
            </h1>
          </main>
        </div>
      </div>
    </div>
  );
};

export default MyActivity;
