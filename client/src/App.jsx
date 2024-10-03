import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext"; // Auth context provider
import ProtectedRoute from "./components/ProtectedRoute"; // Import the ProtectedRoute
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Assessment from "./pages/Assessment";
import BookSession from "./pages/BookSession";
import DownloadSummary from "./pages/DownloadSummary";
import MyActivity from "./pages/MyActivity";
import Packages from "./pages/Packages";
import Report from "./pages/Report";
import SessionManagement from "./pages/SessionManagement";
import Language from "./pages/Language";
import InstructionPage from "./pages/InstructionPage";
import Results from "./pages/Results";
import CompletedAssessment from "./pages/CompletedAssessment";
import Payment from "./pages/Payment";
Dashboard;
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/assessment"
            element={
              <ProtectedRoute>
                <Assessment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/booksession"
            element={
              <ProtectedRoute>
                <BookSession />
              </ProtectedRoute>
            }
          />
          <Route
            path="/downloadsummary"
            element={
              <ProtectedRoute>
                <DownloadSummary />
              </ProtectedRoute>
            }
          />
          <Route
            path="/myactivity"
            element={
              <ProtectedRoute>
                <MyActivity />
              </ProtectedRoute>
            }
          />
          <Route
            path="/packages"
            element={
              <ProtectedRoute>
                <Packages />
              </ProtectedRoute>
            }
          />
          <Route
            path="/report"
            element={
              <ProtectedRoute>
                <Report />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sessionmanagement"
            element={
              <ProtectedRoute>
                <SessionManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/language"
            element={
              <ProtectedRoute>
                <Language />
              </ProtectedRoute>
            }
          />
          <Route
            path="/instructionpage"
            element={
              <ProtectedRoute>
                <InstructionPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/results"
            element={
              <ProtectedRoute>
                <Results />
              </ProtectedRoute>
            }
          />
          <Route
            path="/completedAssessment"
            element={
              <ProtectedRoute>
                <CompletedAssessment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment"
            element={
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
