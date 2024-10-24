import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAllPrograms } from '../adapters/programs-adapters';
import { getFieldDescription, getAllFields } from '../adapters/fields-adapter'; // Import getAllFields
import '../styles/program.css';

const ProgramsList = () => {
    const { fieldId } = useParams();
    const navigate = useNavigate();
    const [programs, setPrograms] = useState([]);
    const [errorText, setErrorText] = useState('');
    const [fieldDescription, setFieldDescription] = useState('');
    const [category, setCategory] = useState(''); // State to hold the field category
    const [fields, setFields] = useState([]); // State to hold fetched fields

    useEffect(() => {
        const fetchPrograms = async () => {
            const fetchedPrograms = await getAllPrograms();
            const filteredPrograms = fetchedPrograms.filter(program => program.fields_id === parseInt(fieldId));

            if (filteredPrograms.length > 0) {
                setPrograms(filteredPrograms);
            } else {
                setErrorText('No programs found for this field.');
            }
        };

        const fetchFieldData = async () => {
            const description = await getFieldDescription(fieldId);
            setFieldDescription(description);
        };

        const fetchFields = async () => {
            const fetchedFields = await getAllFields(); // Fetch all fields
            console.log("Fetched fields:", fetchedFields); // Debugging step
            if (fetchedFields.length > 0) {
                setFields(fetchedFields);
                
                // Find the specific field based on fieldId
                const field = fetchedFields.find(field => field.id === parseInt(fieldId));
                if (field) {
                    setCategory(field.category); // Assuming `field` has a `category` property
                } else {
                    setErrorText('Field not found.');
                }
            } else {
                setErrorText('Error fetching fields or no fields found.');
            }
        };

        fetchPrograms();
        fetchFieldData();
        fetchFields();
    }, [fieldId]);

    const handleBack = () => {
        navigate('/');
    };

    const handleSingleProgram = (e) => {
        let id = null;
        if (e.target.parentNode.className === "program-card") 
            id = e.target.parentNode.getAttribute("data-program-id");
        else 
            id = e.target.getAttribute("data-program-id");
        navigate(`/program/${id}`);
    };

    return (
        <div className="programs-list-container">
            <button className="back-button" onClick={handleBack}>
                Back to Home
            </button>
            {errorText && <p className="error-text">{errorText}</p>}
            {programs.length === 0 && !errorText && <p>Loading programs...</p>}
            {fieldDescription && category && ( // Ensure both are available before rendering
            <>
             <h3>{category} </h3>
             <h4>Description of Field: {fieldDescription}</h4>
            </>
               
            )}
            {programs.map((program) => (
                <div key={program.id} className="program-card" onClick={handleSingleProgram} data-program-id={program.id}>
                    <h4>{program.name}</h4>
                    <p>{program.description}</p>
                </div>
            ))}
        </div>
    );
};

export default ProgramsList;
