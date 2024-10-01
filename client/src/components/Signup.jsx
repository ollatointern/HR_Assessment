import { useState } from "react";
import axios from "axios"; // Import axios for API calls
import { Link, useNavigate } from "react-router-dom";
import ConstantHeader from "../constants/ConstantHeader";
import ConstantFooter from "../constants/ConstantFooter";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState(""); // For error messages
  const [success, setSuccess] = useState(""); // For success messages
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(""); // Reset error
    setSuccess(""); // Reset success

    const signupData = { fullName, email, password, dateOfBirth, gender };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        signupData
      );
      setSuccess(response.data.msg);
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.msg);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Header */}
      <header className="bg-gray-100 text-black p-4 shadow-md">
        <ConstantHeader />
      </header>

      {/* Signup Form */}
      <main className="flex-grow flex justify-center items-center bg-gradient-to-r from-blue-50 to-gray-100">
        <form
          onSubmit={handleSignup}
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg"
        >
          <h2 className="text-3xl font-semibold mb-8 text-center text-blue-700">
            Create Your Account
          </h2>

          {/* Display Error or Success message */}
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && (
            <p className="text-green-500 text-center mb-4">{success}</p>
          )}

          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
              htmlFor="fullName"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
              placeholder="John Doe"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
              htmlFor="dateOfBirth"
            >
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Gender
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all duration-300"
          >
            Sign Up
          </button>
          <div className="text-center mt-4">
            <p>
              Already have an account?{" "}
              <Link
                to="/"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Login here
              </Link>
            </p>
          </div>
        </form>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 text-black p-4 shadow-inner">
        <ConstantFooter />
      </footer>
    </div>
  );
};

export default Signup;
