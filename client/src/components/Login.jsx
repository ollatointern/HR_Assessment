import { useState } from "react";
import axios from "axios"; // Import axios for API calls
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Access the AuthContext

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // For error messages
  const [success, setSuccess] = useState(""); // For success messages
  const [loading, setLoading] = useState(false); // For loading state
  const navigate = useNavigate();
  const { login } = useAuth(); // Use login function from AuthContext

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error
    setSuccess(""); // Reset success
    setLoading(true); // Set loading state to true

    try {
      // Make the POST request to your login API
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      // If login is successful
      const {
        user: { name },
        token,
      } = response.data; // Destructure user object
      login({ name, token }); // Store only the name and token

      setSuccess("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      // Handle error (e.g., invalid credentials)
      if (error.response && error.response.data) {
        setError(error.response.data.msg);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Header */}
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-center text-xl">Header</h1>
      </header>

      {/* Login Form */}
      <main className="flex-grow flex justify-center items-center">
        <form
          onSubmit={handleLogin}
          className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

          {/* Display Error or Success message */}
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && (
            <p className="text-green-500 text-center mb-4">{success}</p>
          )}
          {loading && (
            <p className="text-blue-500 text-center mb-4">Logging in...</p>
          )}

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

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            disabled={loading} // Disable button while loading
          >
            {loading ? "Logging in..." : "Login"} {/* Button text */}
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

export default Login;
