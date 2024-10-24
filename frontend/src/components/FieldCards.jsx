// FieldCards.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { getAllFields } from '../adapters/fields-adapter'; // Import the adapter function to fetch fields
import '../styles/FieldCards.css'

const FieldCards = () => {
    const [fields, setFields] = useState([]); // State to hold the list of fields
    const [errorText, setErrorText] = useState(''); // State to hold error messages
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchFields = async () => {
            const fetchedFields = await getAllFields();
            console.log("Fetched fields:", fetchedFields); // Debugging step
            if (fetchedFields.length > 0) {
                setFields(fetchedFields);
            } else {
                setErrorText('Error fetching fields or no fields found.');
            }
        };
        fetchFields();
    }, []);

    const handleViewAllPrograms = (fieldId) => {
        navigate(`/programs/${fieldId}`); // Redirect to the programs page with the selected field ID
    };

    return (
        <div className="fields-container">
            {errorText && <p className="error-text">{errorText}</p>}
            {fields.length === 0 && !errorText && <p>Loading fields...</p>}
            {fields.map((field) => (
                <div key={field.id} className="field-card">
                    <h3>{field.category}</h3>
                    <button
                        className="view-programs-button"
                        onClick={() => handleViewAllPrograms(field.id)}
                    >
                        View All Programs
                    </button>
                </div>
            ))}
        </div>
    );
};

export default FieldCards;

