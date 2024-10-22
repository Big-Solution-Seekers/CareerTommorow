import ProgramCard from '../components/ProgramCard.jsx'
import '../styles/Results.css'

export default function Results() {
    const programs = [
        {name: ' Program 1', description: ' because abdullah is really buggin bro'},
        {name: ' Program 2', description: ' description 2'},
        {name: ' Program 3', description: ' description 3'},
        {name: ' Program 4', description: ' description 4'},
        {name: ' Program 5', description: ' description 5'}
    ]

    return (
        <div>
            <h1>Field Name</h1>
            <h3>
            Pursuing a career in the technical field involves a blend of education, skill development, and practical experience across various disciplines such as software development, information technology, data analysis, cybersecurity, engineering, and more.
            </h3> 
            <ul>
            {programs.map((program) => (
                <li key={program.name}>
                    <ProgramCard program={program} />
                </li>
            ))}
            </ul>
        </div>
    )
}