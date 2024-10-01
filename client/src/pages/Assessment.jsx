import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../constants/DashboardHeader";

const Assessment = () => {
  const [questions, setQuestions] = useState([]); // Stores fetched questions
  const [currentPage, setCurrentPage] = useState(0); // Manages pagination
  const [answers, setAnswers] = useState({}); // Stores answers as an empty object

  const questionsPerPage = 10;
  const navigate = useNavigate();

  // Fetch questions from API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/questions"
        );
        if (Array.isArray(response.data)) {
          setQuestions(response.data);
        } else {
          console.error("Fetched data is not an array:", response.data);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  // Load answers from local storage when component mounts
  useEffect(() => {
    const storedAnswers = localStorage.getItem("answers");
    if (storedAnswers) {
      setAnswers(JSON.parse(storedAnswers)); // Set answers from local storage
    }
  }, []);

  // Handle option change for radio buttons
  const handleOptionChange = (questionIndex, option) => {
    const updatedAnswers = {
      ...answers,
      [questionIndex]: option,
    };

    setAnswers(updatedAnswers);
    localStorage.setItem("answers", JSON.stringify(updatedAnswers)); // Persist to local storage when an answer is selected
  };

  // Get the selected answer for a question
  const getAnswer = (questionIndex) => {
    return answers[questionIndex] || ""; // Returns an empty string if no answer is selected
  };

  // Render questions for the current page
  const renderQuestions = () => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const currentQuestions = questions.slice(startIndex, endIndex);

    return currentQuestions.map((question, index) => (
      <div key={index} className="border border-gray-300 p-4 mb-4 rounded-lg">
        <h2 className="text-xl font-bold mb-2">
          Question {startIndex + index + 1}: {question.question}
        </h2>
        <div className="flex flex-col">
          {["never", "rarely", "sometimes", "often", "always"].map((option) => (
            <label key={option} className="flex items-center mb-2">
              <input
                type="radio"
                name={`question-${startIndex + index}`}
                value={option}
                checked={getAnswer(startIndex + index) === option}
                onChange={() => handleOptionChange(startIndex + index, option)}
                className="mr-2"
                required
              />
              {option.charAt(0).toUpperCase() + option.slice(1)}{" "}
              {/* Capitalizes first letter */}
            </label>
          ))}
        </div>
      </div>
    ));
  };

  // Handle form submission
  const handleSubmit = () => {
    const totalQuestions = questions.length;
    const totalAnswered = Object.keys(answers).length;

    // Ensure all questions are answered
    if (totalAnswered < totalQuestions) {
      alert("Please answer all the questions before submitting.");
      return;
    }

    // Proceed to results page if all questions are answered
    navigate("/results");
  };

  // Check if all questions on the current page are answered
  const areAllCurrentQuestionsAnswered = () => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = Math.min(startIndex + questionsPerPage, questions.length);

    for (let i = startIndex; i < endIndex; i++) {
      if (!answers[i]) {
        return false; // If any question is unanswered, return false
      }
    }
    return true; // All questions on the page are answered
  };

  return (
    <div className="h-screen">
      {/* Dashboard Header */}
      <DashboardHeader />

      {/* Main Grid Layout with Sidebar and Content */}
      <div className="grid grid-cols-[200px_1fr] gap-4 h-full">
        {/* Sidebar Section */}
        <div className="h-full overflow-y-auto">
          <Sidebar />
        </div>

        {/* Questions Content Section */}
        <div className="p-6 overflow-x-hidden">
          <h1 className="text-3xl font-bold mb-6">Assessment</h1>

          {/* Render Questions */}
          {renderQuestions()}

          {/* Pagination Controls */}
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
              disabled={currentPage === 0}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              Previous
            </button>
            {currentPage >=
            Math.ceil(questions.length / questionsPerPage) - 1 ? (
              <button
                onClick={handleSubmit}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Submit
              </button>
            ) : (
              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(
                      prev + 1,
                      Math.ceil(questions.length / questionsPerPage) - 1
                    )
                  )
                }
                disabled={!areAllCurrentQuestionsAnswered()}
                className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessment;
