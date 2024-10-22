// ProgramsList.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams and useNavigate
import { getAllPrograms } from '../adapters/programs-adapters'; // Import adapter to fetch programs
import  '../styles/program.css'

const ProgramsList = () => {
    const { fieldId } = useParams(); // Get fieldId from the URL parameters
    const navigate = useNavigate(); // Initialize useNavigate for redirection
    const [programs, setPrograms] = useState([]); // State to hold the list of programs
    const [errorText, setErrorText] = useState(''); // State to hold error messages

    useEffect(() => {
        const fetchPrograms = async () => {
            const fetchedPrograms = await getAllPrograms(); // Fetch all programs
            const filteredPrograms = fetchedPrograms.filter(program => program.fields_id === parseInt(fieldId)); // Filter programs by fieldId
            if (filteredPrograms.length > 0) {
                setPrograms(filteredPrograms);
            } else {
                setErrorText('No programs found for this field.');
            }
        };
        fetchPrograms();
    }, [fieldId]);

    const handleBack = () => {
        navigate('/'); // Navigate back to the home page
    };

    return (
        <div className="programs-list-container">
            <button className="back-button" onClick={handleBack}>
                Back to Home
            </button>
            {errorText && <p className="error-text">{errorText}</p>}
            {programs.length === 0 && !errorText && <p>Loading programs...</p>}
            {programs.map((program) => (
                <div key={program.id} className="program-card">
                    <h4>{program.name}</h4>
                    <p>{program.description}</p>
                    <p>Cost: ${program.cost}</p>
                    <a href={program.url} target="_blank" rel="noopener noreferrer">More Info</a>
                </div>
            ))}
        </div>
    );
};

export default ProgramsList;