import { useState } from "react";
import axios from "axios"; // Import axios for API calls
import { useNavigate } from "react-router-dom";

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

    // Your signup data to be sent to the API
    const signupData = { fullName, email, password, dateOfBirth, gender };

    try {
      console.log("Sending signup request:", signupData);
      // Make the POST request to your signup API
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        signupData
      );

      console.log("Response from server:", response.data);

      // If signup is successful
      setSuccess(response.data.msg);

      // Navigate to the login page after signup
      navigate("/login");
    } catch (error) {
      // Handle error (e.g., user already exists, validation errors)
      if (error.response && error.response.data) {
        setError(error.response.data.msg);
        console.error("Signup error:", error.response.data.msg);
      } else {
        setError("Something went wrong. Please try again.");
        console.error("Unknown error:", error);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Header */}
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-center text-xl">Header</h1>
      </header>

      {/* Signup Form */}
      <main className="flex-grow flex justify-center items-center">
        <form
          onSubmit={handleSignup}
          className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>

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
              className="w-full p-2 border border-gray-300 rounded"
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
              className="w-full p-2 border border-gray-300 rounded"
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
              className="w-full p-2 border border-gray-300 rounded"
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
              className="w-full p-2 border border-gray-300 rounded"
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
              className="w-full p-2 border border-gray-300 rounded"
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
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Sign Up
          </button>
        </form>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4">
        <p className="text-center">Footer</p>
      </footer>
    </div>
  );
};

export default Signup;
