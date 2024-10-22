import "../styles/Quiz.css"
import { useState } from "react";
import { Link } from 'react-router-dom'

export default function Quiz() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      question: "Do you prefer a job that offers flexible remote work options or one that requires you to be on-site for hands-on tasks?",
      options: [
        "I prefer flexible remote work options.",
        "I prefer a mix of remote work and on-site tasks.",
        "I prefer being on-site for hands-on tasks.",
        "I am open to either option."
      ]
    },
    {
      question: "Do you prefer a career with a focus on physical work or one with more intellectual/analytical tasks?",
      options: [
        "Physical work.",
        "Intellectual/analytical tasks.",
        "A combination of both.",
        "I am flexible with either."
      ]
    },
    {
      question: "How do you feel about working in fast-paced, constantly evolving environments?",
      options: [
        "I thrive in fast-paced, evolving environments.",
        "I prefer a moderate pace with occasional changes.",
        "I prefer a stable, predictable work environment.",
        "I am adaptable to any environment."
      ]
    },
    {
      question: "What is more important to you: creativity, job stability, or physical activity?",
      options: [
        "Creativity.",
        "Job stability.",
        "Physical activity.",
        "A balance of all three."
      ]
    },
    {
      question: "Do you value job flexibility, or are you looking for a career with strong hands-on skills?",
      options: [
        "I value job flexibility.",
        "I prefer a career with strong hands-on skills.",
        "I value both flexibility and hands-on skills equally.",
        "I'm not sure yet."
      ]
    }
  ];

  const handleAnswerChange = (questionIndex, option) => {
    setAnswers({
      ...answers,
      [questionIndex]: option
    });
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const handleRetake = () => {
    setAnswers({});
    setShowResults(false);
  };

  const optionLetters = ["A", "B", "C", "D"]; // Array to map options to letters

  return (
    <div id="quiz-container">
      <h1 className="quiz-title">Career Preference Quiz</h1>
        <>
          {questions.map((q, index) => (
            <div key={index} className="quiz-question-container">
              <h3 className="quiz-question">{q.question}</h3>
              <div className="quiz-options">
                {q.options.map((option, i) => (
                  <button
                    key={i}
                    className={`quiz-option-button ${answers[index] === option ? "selected" : ""}`}
                    onClick={() => {
                        handleAnswerChange(index, option)
                        console.log(index, option)
                    }
                    }
                  >
                    {`${optionLetters[i]}. ${option}`}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <Link to='/results'>
          <button id="submit-button" className="quiz-button" type="submit">
            Submit
          </button>
          </Link>
        </>
    </div>
  );
}
