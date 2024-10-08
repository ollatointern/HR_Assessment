// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";
// // import Sidebar from "../components/Sidebar";
// // import DashboardHeader from "../constants/DashboardHeader";

// // const Assessment = () => {
// //   const [questions, setQuestions] = useState([]); // Stores fetched questions
// //   const [currentPage, setCurrentPage] = useState(0); // Manages pagination
// //   const [answers, setAnswers] = useState({}); // Stores answers as an empty object

// //   const questionsPerPage = 10;
// //   const navigate = useNavigate();

// //   // Fetch questions from API
// //   useEffect(() => {
// //     const fetchQuestions = async () => {
// //       try {
// //         const response = await axios.get(
// //           "http://localhost:5000/api/auth/questions"
// //         );
// //         if (Array.isArray(response.data)) {
// //           setQuestions(response.data);
// //         } else {
// //           console.error("Fetched data is not an array:", response.data);
// //         }
// //       } catch (error) {
// //         console.error("Error fetching questions:", error);
// //       }
// //     };

// //     fetchQuestions();
// //   }, []);

// //   // Load answers from local storage when component mounts
// //   useEffect(() => {
// //     const storedAnswers = localStorage.getItem("answers");
// //     if (storedAnswers) {
// //       setAnswers(JSON.parse(storedAnswers)); // Set answers from local storage
// //     }
// //   }, []);

// //   // Handle option change for radio buttons
// //   const handleOptionChange = (questionIndex, option) => {
// //     const updatedAnswers = {
// //       ...answers,
// //       [questionIndex]: option,
// //     };

// //     setAnswers(updatedAnswers);
// //     localStorage.setItem("answers", JSON.stringify(updatedAnswers)); // Persist to local storage when an answer is selected
// //   };

// //   // Get the selected answer for a question
// //   const getAnswer = (questionIndex) => {
// //     return answers[questionIndex] || ""; // Returns an empty string if no answer is selected
// //   };

// //   // Render questions for the current page
// //   const renderQuestions = () => {
// //     const startIndex = currentPage * questionsPerPage;
// //     const endIndex = startIndex + questionsPerPage;
// //     const currentQuestions = questions.slice(startIndex, endIndex);

// //     return currentQuestions.map((question, index) => (
// //       <div key={index} className="border border-gray-300 p-4 mb-4 rounded-lg">
// //         <h2 className="text-xl font-bold mb-2">
// //           Question {startIndex + index + 1}: {question.question}
// //         </h2>
// //         <div className="flex flex-col">
// //           {["never", "rarely", "sometimes", "often", "always"].map((option) => (
// //             <label key={option} className="flex items-center mb-2">
// //               <input
// //                 type="radio"
// //                 name={`question-${startIndex + index}`}
// //                 value={option}
// //                 checked={getAnswer(startIndex + index) === option}
// //                 onChange={() => handleOptionChange(startIndex + index, option)}
// //                 className="mr-2"
// //                 required
// //               />
// //               {option.charAt(0).toUpperCase() + option.slice(1)}{" "}
// //               {/* Capitalizes first letter */}
// //             </label>
// //           ))}
// //         </div>
// //       </div>
// //     ));
// //   };

// //   // Handle form submission
// //   const handleSubmit = () => {
// //     const totalQuestions = questions.length;
// //     const totalAnswered = Object.keys(answers).length;

// //     // Ensure all questions are answered
// //     if (totalAnswered < totalQuestions) {
// //       alert("Please answer all the questions before submitting.");
// //       return;
// //     }

// //     // Proceed to results page if all questions are answered
// //     navigate("/results");
// //   };

// //   // Check if all questions on the current page are answered
// //   const areAllCurrentQuestionsAnswered = () => {
// //     const startIndex = currentPage * questionsPerPage;
// //     const endIndex = Math.min(startIndex + questionsPerPage, questions.length);

// //     for (let i = startIndex; i < endIndex; i++) {
// //       if (!answers[i]) {
// //         return false; // If any question is unanswered, return false
// //       }
// //     }
// //     return true; // All questions on the page are answered
// //   };

// //   return (
// //     <div className="h-screen">
// //       {/* Dashboard Header */}
// //       <DashboardHeader />

// //       {/* Main Grid Layout with Sidebar and Content */}
// //       <div className="grid grid-cols-[200px_1fr] gap-4 h-full">
// //         {/* Sidebar Section */}
// //         <div className="h-full overflow-y-auto">
// //           <Sidebar />
// //         </div>

// //         {/* Questions Content Section */}
// //         <div className="p-6 overflow-x-hidden">
// //           <h1 className="text-3xl font-bold mb-6">Assessment</h1>

// //           {/* Render Questions */}
// //           {renderQuestions()}

// //           {/* Pagination Controls */}
// //           <div className="flex justify-between mt-6">
// //             <button
// //               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
// //               disabled={currentPage === 0}
// //               className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
// //             >
// //               Previous
// //             </button>
// //             {currentPage >=
// //             Math.ceil(questions.length / questionsPerPage) - 1 ? (
// //               <button
// //                 onClick={handleSubmit}
// //                 className="bg-green-500 text-white px-4 py-2 rounded"
// //               >
// //                 Submit
// //               </button>
// //             ) : (
// //               <button
// //                 onClick={() =>
// //                   setCurrentPage((prev) =>
// //                     Math.min(
// //                       prev + 1,
// //                       Math.ceil(questions.length / questionsPerPage) - 1
// //                     )
// //                   )
// //                 }
// //                 disabled={!areAllCurrentQuestionsAnswered()}
// //                 className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
// //               >
// //                 Next
// //               </button>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Assessment;

// import { useEffect, useState } from "react";
// import { useAuth } from "../contexts/AuthContext";

// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
// import DashboardHeader from "../constants/DashboardHeader";

// const Assessment = () => {
//   const [questions, setQuestions] = useState([]); // Stores fetched questions
//   const [currentPage, setCurrentPage] = useState(0); // Manages pagination
//   const [answers, setAnswers] = useState({}); // Stores answers as an empty object

//   const questionsPerPage = 10;
//   const navigate = useNavigate();

//   // Scoring system
//   const scoring = {
//     always: 10,
//     often: 7,
//     sometimes: 5,
//     rarely: 3,
//     never: 0,
//   };

//   // Fetch questions from API
//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/auth/questions"
//         );
//         if (Array.isArray(response.data)) {
//           setQuestions(response.data);
//         } else {
//           console.error("Fetched data is not an array:", response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching questions:", error);
//       }
//     };

//     fetchQuestions();
//   }, []);

//   // Load answers from local storage when component mounts
//   useEffect(() => {
//     const storedAnswers = localStorage.getItem("answers");
//     if (storedAnswers) {
//       setAnswers(JSON.parse(storedAnswers)); // Set answers from local storage
//     }
//   }, []);

//   // Handle option change for radio buttons
//   const handleOptionChange = (questionIndex, option) => {
//     const updatedAnswers = {
//       ...answers,
//       [questionIndex]: option,
//     };

//     setAnswers(updatedAnswers);
//     localStorage.setItem("answers", JSON.stringify(updatedAnswers)); // Persist to local storage when an answer is selected
//   };

//   // Get the selected answer for a question
//   const getAnswer = (questionIndex) => {
//     return answers[questionIndex] || ""; // Returns an empty string if no answer is selected
//   };

//   // Render questions for the current page
//   const renderQuestions = () => {
//     const startIndex = currentPage * questionsPerPage;
//     const endIndex = startIndex + questionsPerPage;
//     const currentQuestions = questions.slice(startIndex, endIndex);

//     return currentQuestions.map((question, index) => (
//       <div key={index} className="border border-gray-300 p-4 mb-4 rounded-lg">
//         <h2 className="text-xl font-bold mb-2">
//           Question {startIndex + index + 1}: {question.question}
//         </h2>
//         <div className="flex flex-col">
//           {["never", "rarely", "sometimes", "often", "always"].map((option) => (
//             <label key={option} className="flex items-center mb-2">
//               <input
//                 type="radio"
//                 name={`question-${startIndex + index}`}
//                 value={option}
//                 checked={getAnswer(startIndex + index) === option}
//                 onChange={() => handleOptionChange(startIndex + index, option)}
//                 className="mr-2"
//                 required
//               />
//               {option.charAt(0).toUpperCase() + option.slice(1)}{" "}
//               {/* Capitalizes first letter */}
//             </label>
//           ))}
//         </div>
//       </div>
//     ));
//   };

//   // Calculate domain scores based on answers
//   const calculateDomainScores = () => {
//     const domainScores = {
//       jobSecurity: 0,
//       WorkEnvironment: 0,
//       WorkOverload: 0,
//       WorkSatisfaction: 0,
//       WorkLifeBalance: 0,
//       CareerOpportunities: 0,
//       Stress: 0,
//       Anxiety: 0,
//       Depression: 0,
//       CopingMechanism: 0,
//     };

//     // Iterate through the answers to calculate scores
//     Object.keys(domainScores).forEach((domain, index) => {
//       const start = index * 10;
//       const end = start + 10;

//       for (let i = start; i < end; i++) {
//         const answer = answers[i];
//         domainScores[domain] += scoring[answer] || 0; // Add score based on answer
//       }
//     });

//     return domainScores;
//   };

//   // Handle form submission
//   const handleSubmit = () => {
//     const { user } = useAuth();
//     const { id } = useAuth();
//     const totalQuestions = questions.length;
//     const totalAnswered = Object.keys(answers).length;

//     // Ensure all questions are answered
//     if (totalAnswered < totalQuestions) {
//       alert("Please answer all the questions before submitting.");
//       return;
//     }

//     const scores = calculateDomainScores();

//     // Prepare data to send to the backend
//     const dataToSubmit = {
//       Student_id: user.id, // Replace with actual student ID
//       Student_name: user.name, // Replace with actual student name
//       language_code: "en",
//       completedTest: 1,
//       ...scores, // Spread domain scores into the data object
//     };

//     // Send data to the backend
//     axios
//       .post("http://localhost:5000/api/auth/submit-assessment", dataToSubmit)
//       .then((response) => {
//         console.log(response.data);
//         navigate("/results"); // Navigate to results after submission
//       })
//       .catch((error) => {
//         console.error("Error submitting assessment:", error);
//       });
//   };

//   // Check if all questions on the current page are answered
//   const areAllCurrentQuestionsAnswered = () => {
//     const startIndex = currentPage * questionsPerPage;
//     const endIndex = Math.min(startIndex + questionsPerPage, questions.length);

//     for (let i = startIndex; i < endIndex; i++) {
//       if (!answers[i]) {
//         return false; // If any question is unanswered, return false
//       }
//     }
//     return true; // All questions on the page are answered
//   };

//   return (
//     <div className="h-screen">
//       {/* Dashboard Header */}
//       <DashboardHeader />

//       {/* Main Grid Layout with Sidebar and Content */}
//       <div className="grid grid-cols-[200px_1fr] gap-4 h-full">
//         {/* Sidebar Section */}
//         <div className="h-full overflow-y-auto">
//           <Sidebar />
//         </div>

//         {/* Questions Content Section */}
//         <div className="p-6 overflow-x-hidden">
//           <h1 className="text-3xl font-bold mb-6">Assessment</h1>

//           {/* Render Questions */}
//           {renderQuestions()}

//           {/* Pagination Controls */}
//           <div className="flex justify-between mt-6">
//             <button
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
//               disabled={currentPage === 0}
//               className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
//             >
//               Previous
//             </button>
//             {currentPage >=
//             Math.ceil(questions.length / questionsPerPage) - 1 ? (
//               <button
//                 onClick={handleSubmit}
//                 className="bg-green-500 text-white px-4 py-2 rounded"
//               >
//                 Submit
//               </button>
//             ) : (
//               <button
//                 onClick={() =>
//                   setCurrentPage((prev) =>
//                     Math.min(
//                       prev + 1,
//                       Math.ceil(questions.length / questionsPerPage) - 1
//                     )
//                   )
//                 }
//                 disabled={!areAllCurrentQuestionsAnswered()}
//                 className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
//               >
//                 Next
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Assessment;

// import { useEffect, useState } from "react";
// import { useAuth } from "../contexts/AuthContext"; // Assuming useAuth provides user context
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
// import DashboardHeader from "../constants/DashboardHeader";

// const Assessment = () => {
//   const [questions, setQuestions] = useState([]); // Stores fetched questions
//   const [currentPage, setCurrentPage] = useState(0); // Manages pagination
//   const [answers, setAnswers] = useState({}); // Stores answers as an empty object

//   const questionsPerPage = 10;
//   const navigate = useNavigate();

//   // Scoring system
//   const scoring = {
//     always: 10,
//     often: 7,
//     sometimes: 5,
//     rarely: 3,
//     never: 0,
//   };

//   // Handle form submission
//   const { user } = useAuth(); // Make sure user context provides both user and id
//   console.log(user);
//   console.log(user.id);
//   const handleSubmit = () => {
//     const totalQuestions = questions.length;
//     const totalAnswered = Object.keys(answers).length;

//     // Ensure all questions are answered
//     if (totalAnswered < totalQuestions) {
//       alert("Please answer all the questions before submitting.");
//       return;
//     }

//     const scores = calculateDomainScores();

//     // Prepare data to send to the backend
//     const dataToSubmit = {
//       Student_id: user.id, // Replace with actual student ID
//       Student_name: user.name, // Replace with actual student name
//       language_code: "en",
//       completedTest: 1,
//       ...scores, // Spread domain scores into the data object
//     };

//     // Send data to the backend
//     axios
//       .post("http://localhost:5000/api/auth/submit-assessment", dataToSubmit)
//       .then((response) => {
//         console.log(response.data);
//         localStorage.removeItem("answers");

//         navigate("/completedAssessment"); // Navigate to results after submission
//       })
//       .catch((error) => {
//         console.error("Error submitting assessment:", error);
//       });
//   };

//   // Fetch questions from API
//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/auth/questions"
//         );
//         if (Array.isArray(response.data)) {
//           setQuestions(response.data);
//         } else {
//           console.error("Fetched data is not an array:", response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching questions:", error);
//       }
//     };

//     fetchQuestions();
//   }, []);

//   // Load answers from local storage when component mounts
//   useEffect(() => {
//     const storedAnswers = localStorage.getItem("answers");
//     if (storedAnswers) {
//       setAnswers(JSON.parse(storedAnswers)); // Set answers from local storage
//     }
//   }, []);

//   // Handle option change for radio buttons
//   const handleOptionChange = (questionIndex, option) => {
//     const updatedAnswers = {
//       ...answers,
//       [questionIndex]: option,
//     };

//     setAnswers(updatedAnswers);
//     localStorage.setItem("answers", JSON.stringify(updatedAnswers)); // Persist to local storage when an answer is selected
//   };

//   // Get the selected answer for a question
//   const getAnswer = (questionIndex) => {
//     return answers[questionIndex] || ""; // Returns an empty string if no answer is selected
//   };

//   // Render questions for the current page
//   const renderQuestions = () => {
//     const startIndex = currentPage * questionsPerPage;
//     const endIndex = startIndex + questionsPerPage;
//     const currentQuestions = questions.slice(startIndex, endIndex);

//     return currentQuestions.map((question, index) => (
//       <div
//         key={startIndex + index}
//         className="border border-gray-300 p-4 mb-4 rounded-lg"
//       >
//         <h2 className="text-xl font-bold mb-2">
//           Question {startIndex + index + 1}: {question.question}
//         </h2>
//         <div className="flex flex-col">
//           {["never", "rarely", "sometimes", "often", "always"].map((option) => (
//             <label key={option} className="flex items-center mb-2">
//               <input
//                 type="radio"
//                 name={`question-${startIndex + index}`}
//                 value={option}
//                 checked={getAnswer(startIndex + index) === option}
//                 onChange={() => handleOptionChange(startIndex + index, option)}
//                 className="mr-2"
//                 required
//               />
//               {option.charAt(0).toUpperCase() + option.slice(1)}{" "}
//               {/* Capitalizes first letter */}
//             </label>
//           ))}
//         </div>
//       </div>
//     ));
//   };

//   // Calculate domain scores based on answers
//   const calculateDomainScores = () => {
//     const domainScores = {
//       jobSecurity: 0,
//       WorkEnvironment: 0,
//       WorkOverload: 0,
//       WorkSatisfaction: 0,
//       WorkLifeBalance: 0,
//       CareerOpportunities: 0,
//       Stress: 0,
//       Anxiety: 0,
//       Depression: 0,
//       CopingMechanism: 0,
//     };

//     // Iterate through the answers to calculate scores
//     Object.keys(domainScores).forEach((domain, index) => {
//       const start = index * 10;
//       const end = start + 10;

//       for (let i = start; i < end; i++) {
//         const answer = answers[i];
//         domainScores[domain] += scoring[answer] || 0; // Add score based on answer
//       }
//     });

//     return domainScores;
//   };

//   // Handle form submission
//   // const handleSubmit = () => {
//   //   const { user } = useAuth(); // Make sure user context provides both user and id
//   //   const totalQuestions = questions.length;
//   //   const totalAnswered = Object.keys(answers).length;

//   //   // Ensure all questions are answered
//   //   if (totalAnswered < totalQuestions) {
//   //     alert("Please answer all the questions before submitting.");
//   //     return;
//   //   }

//   //   const scores = calculateDomainScores();

//   //   // Prepare data to send to the backend
//   //   const dataToSubmit = {
//   //     Student_id: user.id, // Replace with actual student ID
//   //     Student_name: user.name, // Replace with actual student name
//   //     language_code: "en",
//   //     completedTest: 1,
//   //     ...scores, // Spread domain scores into the data object
//   //   };

//   //   // Send data to the backend
//   //   axios
//   //     .post("http://localhost:5000/api/auth/submit-assessment", dataToSubmit)
//   //     .then((response) => {
//   //       console.log(response.data);
//   //       navigate("/results"); // Navigate to results after submission
//   //     })
//   //     .catch((error) => {
//   //       console.error("Error submitting assessment:", error);
//   //     });
//   // };

//   // Check if all questions on the current page are answered
//   const areAllCurrentQuestionsAnswered = () => {
//     const startIndex = currentPage * questionsPerPage;
//     const endIndex = Math.min(startIndex + questionsPerPage, questions.length);

//     for (let i = startIndex; i < endIndex; i++) {
//       if (!answers[i]) {
//         return false; // If any question is unanswered, return false
//       }
//     }
//     return true; // All questions on the page are answered
//   };

//   return (
//     <div className="h-screen">
//       {/* Dashboard Header */}
//       <DashboardHeader />

//       {/* Main Grid Layout with Sidebar and Content */}
//       <div className="grid grid-cols-[200px_1fr] gap-4 h-full">
//         {/* Sidebar Section */}
//         <div className="h-full overflow-y-auto">
//           <Sidebar />
//         </div>

//         {/* Questions Content Section */}
//         <div className="p-6 overflow-x-hidden">
//           <h1 className="text-3xl font-bold mb-6">Assessment</h1>

//           {/* Render Questions */}
//           {renderQuestions()}

//           {/* Pagination Controls */}
//           <div className="flex justify-between mt-6">
//             <button
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
//               disabled={currentPage === 0}
//               className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
//             >
//               Previous
//             </button>
//             {currentPage >=
//             Math.ceil(questions.length / questionsPerPage) - 1 ? (
//               <button
//                 onClick={handleSubmit}
//                 className="bg-green-500 text-white px-4 py-2 rounded"
//               >
//                 Submit
//               </button>
//             ) : (
//               <button
//                 onClick={() =>
//                   setCurrentPage((prev) =>
//                     Math.min(
//                       prev + 1,
//                       Math.ceil(questions.length / questionsPerPage) - 1
//                     )
//                   )
//                 }
//                 disabled={!areAllCurrentQuestionsAnswered()}
//                 className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
//               >
//                 Next
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Assessment;
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext"; // Assuming useAuth provides user context
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../constants/DashboardHeader";

const Assessment = () => {
  const [questions, setQuestions] = useState([]); // Stores fetched questions
  const [currentPage, setCurrentPage] = useState(0); // Manages pagination
  const [answers, setAnswers] = useState({}); // Stores answers as an empty object
  const [timeRemaining, setTimeRemaining] = useState(() => {
    const savedTime = localStorage.getItem("timeRemaining");
    return savedTime ? JSON.parse(savedTime) : 3600; // Default to 1 hour in seconds
  });

  const questionsPerPage = 10;
  const navigate = useNavigate();

  // Scoring system
  const scoring = {
    always: 10,
    often: 7,
    sometimes: 5,
    rarely: 3,
    never: 0,
  };

  const { user } = useAuth(); // Make sure user context provides both user and id

  // Handle form submission
  const handleSubmit = () => {
    if (Object.keys(answers).length < questions.length) {
      alert("Please attempt all questions before submitting."); // Alert if not all questions are answered
      scrollToTop(); // Scroll to top on submit attempt
      return;
    }

    const scores = calculateDomainScores();

    // Prepare data to send to the backend
    const dataToSubmit = {
      Student_id: user.id,
      Student_name: user.name,
      language_code: "en",
      completedTest: 1,
      ...scores,
    };

    // Send data to the backend
    axios
      .post("http://localhost:5000/api/auth/submit-assessment", dataToSubmit)
      .then((response) => {
        console.log(response.data);
        localStorage.removeItem("answers");
        localStorage.removeItem("timeRemaining"); // Clear timer on submission
        navigate("/completedAssessment"); // Navigate to results after submission
      })
      .catch((error) => {
        console.error("Error submitting assessment:", error);
      });
  };

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

    // Prevent navigation away from the page
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ""; // For modern browsers to show a confirmation dialog
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // Load answers from local storage when component mounts
  useEffect(() => {
    const storedAnswers = localStorage.getItem("answers");
    if (storedAnswers) {
      setAnswers(JSON.parse(storedAnswers)); // Set answers from local storage
    }
  }, []);

  // Countdown timer effect
  useEffect(() => {
    if (timeRemaining <= 0) {
      handleSubmit(); // Automatically submit if time is up
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        const newTime = prevTime - 1;
        localStorage.setItem("timeRemaining", newTime); // Store updated time
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer on unmount
  }, [timeRemaining]);

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
      <div
        key={startIndex + index}
        className="border border-gray-300 p-4 mb-4 rounded-lg"
      >
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

  // Calculate domain scores based on answers
  const calculateDomainScores = () => {
    const domainScores = {
      jobSecurity: 0,
      WorkEnvironment: 0,
      WorkOverload: 0,
      WorkSatisfaction: 0,
      WorkLifeBalance: 0,
      CareerOpportunities: 0,
      Stress: 0,
      Anxiety: 0,
      Depression: 0,
      CopingMechanism: 0,
    };

    // Iterate through the answers to calculate scores
    Object.keys(domainScores).forEach((domain, index) => {
      const start = index * 10;
      const end = start + 10;

      for (let i = start; i < end; i++) {
        const answer = answers[i];
        domainScores[domain] += scoring[answer] || 0; // Add score based on answer
      }
    });

    return domainScores;
  };

  // Check if all questions on the current page are answered
  const areAllCurrentQuestionsAnswered = () => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = Math.min(startIndex + questionsPerPage, questions.length);
    let allAnswered = true;

    for (let i = startIndex; i < endIndex; i++) {
      if (!answers[i]) {
        allAnswered = false; // If any question is unanswered, set flag to false
        break;
      }
    }
    return allAnswered; // Return the status
  };

  // Scroll to top of the page smoothly
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="h-screen relative">
      {/* Dashboard Header */}
      <DashboardHeader />

      {/* Timer Display */}
      <div className="absolute top-16 right-0 flex justify-end pr-6">
        <div className="text-2xl font-bold text-red-500">
          Time Remaining: {Math.floor(timeRemaining / 60)}:
          {("0" + (timeRemaining % 60)).slice(-2)}
        </div>
      </div>

      {/* Main Grid Layout with Sidebar and Content */}
      <div className="grid grid-cols-[200px_1fr] gap-4 h-full">
        {/* Sidebar Section */}
        <div className="h-full overflow-y-auto pt-12 mt-12">
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
              onClick={() => {
                setCurrentPage((prev) => {
                  const newPage = Math.max(prev - 1, 0); // Move to previous page, not below 0
                  scrollToTop(); // Scroll to top on page change
                  return newPage;
                });
              }}
              disabled={currentPage === 0} // Disable if on the first page
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-all"
            >
              Previous
            </button>

            {currentPage ===
            Math.ceil(questions.length / questionsPerPage) - 1 ? (
              <button
                onClick={handleSubmit}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              >
                Submit
              </button>
            ) : (
              <button
                onClick={() => {
                  if (areAllCurrentQuestionsAnswered()) {
                    setCurrentPage((prev) =>
                      Math.min(
                        prev + 1,
                        Math.ceil(questions.length / questionsPerPage) - 1
                      )
                    );
                    scrollToTop(); // Scroll to top on page change
                  } else {
                    alert(
                      "Please attempt all questions on this page before moving on."
                    ); // Alert if not all questions are answered
                    scrollToTop(); // Scroll to top on next button attempt
                  }
                }}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-all"
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
