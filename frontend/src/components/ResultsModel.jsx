import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllFields } from '../adapters/fields-adapter';
import '../styles/ResultsModel.css';

const ResultsModel = ({ answers, questions }) => {
    const [fields, setFields] = useState([]);
    const [modal, setModal] = useState(false);
    const [selectedField, setSelectedField] = useState(null); // to track the chosen field
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFields = async () => {
            try {
                const fetchedFields = await getAllFields();
                console.log("Fetched fields:", fetchedFields); // Debugging step
                if (fetchedFields.length > 0) {
                    setFields(fetchedFields);
                } else {
                    console.error('Error fetching fields or no fields found.');
                }
            } catch (error) {
                console.error('Failed to fetch fields:', error);
            }
        };
        fetchFields();
    }, []);

    const handleSubmit = () => {
        let count = 0;

        if (Object.keys(answers).length === questions.length) { // Ensure all questions are answered
            for (const answer in answers) {
                for (const question of questions) {
                    const options = question.options;
                    for (const option of options) {
                        if (answers[answer] === option[0]) {
                            console.log(option[1]);
                            count += option[1];
                        }
                    }
                }
            }

            console.log(count);
            let field = null;

            if (count >= 125 && count <= 200) {
                field = fields[0];
            } else if (count >= 225 && count <= 300) {
                field = fields[1];
            } else if (count >= 325 && count <= 400) {
                field = fields[2];
            } else if (count >= 425 && count <= 500) {
                field = fields[3];
            }

            if (field) {
                setSelectedField(field); // Set the selected field
                setModal(true); // Show the modal after selecting a field
            } else {
                alert('No field matches your score.');
            }
        } else {
            alert('Please answer all questions before submitting.');
        }
    };

    const handleViewAllPrograms = (fieldId) => {
        navigate(`/programs/${fieldId}`); // Redirect to the programs page with the selected field ID
    };

    return (
        <div>
            <button
                id="submit-button"
                className="quiz-button"
                type="submit"
                onClick={handleSubmit}
            >
                Submit
            </button>

            {modal && selectedField && (
                <div className="result-model">
                    <div className="result-overlay" onClick={() => setModal(false)}></div>
                    <div className="result-model-content">
                        <h1>
                            Based on the results, we feel that pursuing a career in {selectedField.category} would be a great fit for you.
                        </h1>
                    <button
                        className="view-programs-button"
                        onClick={() => handleViewAllPrograms(selectedField.id)}
                    >
                        View Programs
                    </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResultsModel;
