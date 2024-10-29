import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAllPrograms } from '../adapters/programs-adapters';
import { getFieldDescription, getAllFields } from '../adapters/fields-adapter'; // Import getAllFields
import '../styles/program.css';
import ProgramCard from '../components/ProgramCard';

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

    const handleSideBar = (e) => {
        if(e.target.innerText === category) {
            return
        } else if(e.target.innerText === 'Technology') {
            console.log(fields[0].id)
            navigate(`/programs/${fields[0].id}`)
        } else if(e.target.innerText === 'Business') {
            console.log(fields[1].id)
            navigate(`/programs/${fields[1].id}`)
        } else if(e.target.innerText === 'Health care') {
            console.log(fields[2].id)
            navigate(`/programs/${fields[2].id}`)
        } else if(e.target.innerText === 'Trade') {
            console.log(fields[3].id)
            navigate(`/programs/${fields[3].id}`)
        }
    }

    return (
        <div className='container'>
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
            <div className='wrapper'>
            <div className="programs-list-container">
            {programs.map((program) => (
                <ProgramCard key={program.id} program={program} />
            ))}
            </div>
            <ul className='side-bar'>
                <li>
                    <button className='route' onClick={handleSideBar}>Technology</button>
                </li>
                <li>
                    <button className='route'onClick={handleSideBar}>Business</button>
                </li>
                <li>
                    <button className='route'onClick={handleSideBar}>Health care</button>
                </li>
                <li>
                    <button className='route'onClick={handleSideBar}>Trade</button>
                </li>
            </ul>
            </div>
        </div>
    );
};

export default ProgramsList;
