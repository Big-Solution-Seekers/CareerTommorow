import "../styles/Quiz.css";
import { useState } from "react";
import ResultsModel from "../components/ResultsModel";

export default function Quiz() {
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track the current question
  const [showModal, setShowModal] = useState(false); // Track when to show the modal

  const questions = [
    {
      question: "Do you prefer a job that offers flexible remote work options or one that requires you to be on-site for hands-on tasks?",
      options: [
        ["I prefer flexible remote work options.", 25],
        ["I prefer a mix of remote work and on-site tasks.", 50],
        ["I prefer being on-site for hands-on tasks.", 100],
        ["I am open to either option.", 75]
      ]
    },
    {
      question: "Do you prefer a career with a focus on physical work or one with more intellectual/analytical tasks?",
      options: [
        ["Physical work.", 100],
        ["Intellectual/analytical tasks.", 25],
        ["A combination of both.", 75],
        ["I am flexible with either.", 50]
      ]
    },
    {
      question: "How do you feel about working in fast-paced, constantly evolving environments?",
      options: [
        ["I thrive in fast-paced, evolving environments.", 25],
        ["I prefer a moderate pace with occasional changes.", 50],
        ["I prefer a stable, predictable work environment.", 100],
        ["I am adaptable to any environment.", 75]
      ]
    },
    {
      question: "What is more important to you: creativity, job stability, or physical activity?",
      options: [
        ["Creativity.", 25],
        ["Job stability.", 75],
        ["Physical activity.", 100],
        ["A balance of all three.", 50]
      ]
    },
    {
      question: "Do you value job flexibility, or are you looking for a career with strong hands-on skills?",
      options: [
        ["I value job flexibility.", 25],
        ["I prefer a career with strong hands-on skills.", 100],
        ["I value both flexibility and hands-on skills equally.", 75],
        ["I'm not sure yet.", 50]
      ]
    }
  ];

  const handleAnswerChange = (questionIndex, option) => {
    setAnswers({
      ...answers,
      [questionIndex]: option[0]
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowModal(true); // Show modal when last question is answered
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const optionLetters = ["A", "B", "C", "D"]; // Array to map options to letters

  return (
    <div id="quiz-container">
          <div className='box'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div >
    <h1 className="quiz-title">Career Preference Quiz</h1>
    {!showModal ? (
        <>
          <div className="quiz-question-container">
            <h3 className="quiz-question">
              {questions[currentQuestionIndex].question}
            </h3>
            <div className="quiz-options">
              {questions[currentQuestionIndex].options.map((option, i) => (
                <button
                  key={i}
                  className={`quiz-option-button ${
                  answers[currentQuestionIndex] === option[0] ? "selected" : ""
                  }`}
                  onClick={() => handleAnswerChange(currentQuestionIndex, option)}
                >
                  {`${optionLetters[i]}. ${option[0]}`}
                </button>
              ))}
            </div>
          </div>
          <div className="quiz-navigation-buttons">
            {currentQuestionIndex > 0 && (
              <button
                className="back-button"
                onClick={handlePreviousQuestion}
              >
                Back
              </button>
            )}
            <button
              className="next-button"
              onClick={handleNextQuestion}
              disabled={!answers[currentQuestionIndex]} // Disable until an option is selected
            >
              {currentQuestionIndex === questions.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </>
      ) : (<>
      <h1 className="calculated">We've calculated the results!</h1>
      <ResultsModel answers={answers} questions={questions} />
      </>
      )}
    </div>
  );
}
