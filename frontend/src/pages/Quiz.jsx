import "../styles/Quiz.css"
import { useState } from "react";
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

export default function Quiz() {
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate()

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

  const handleSubmit = (answers) => {
    let count = 0

    for(const answer in answers) {
        for(const question of questions) {
            const options = question.options
            for(const option of options) {
                if(answers[answer] === option[0]) {
                    console.log(option[1])
                    count += option[1]
                }
            }
        }
    }

    console.log(count)
    if(count >= 125 && count <= 200) {
        navigate(`/programs/1`)
    } else if(count >= 225 && count <= 300) {
        navigate(`/programs/2`)
    } else if(count >= 325 && count <= 400) {
        navigate(`/programs/3`)
    } else if(count >= 425 && count <= 500) {
        navigate(`/programs/4`)
    }
  }

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
                    className={`quiz-option-button ${answers[index] === option[0] ? "selected" : ""}`}
                    onClick={() => {
                        handleAnswerChange(index, option)
                        // console.log(index, option)
                    }
                    }
                  >
                    {`${optionLetters[i]}. ${option[0]}`}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <button id="submit-button" 
          className="quiz-button" 
          type="submit"
          onClick={() => {
            handleSubmit(answers)
          }}>
            Submit
          </button>
        </>
    </div>
  );
}
