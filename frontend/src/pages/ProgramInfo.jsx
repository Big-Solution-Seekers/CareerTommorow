import { useParams } from "react-router-dom";
import { getProgram } from "../adapters/programs-adapters";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../styles/programPage.css';

const ProgramInfo = () => {
  const { id } = useParams();
  const [mapButton, setMapButton] = useState(false);
  const [program, setProgram] = useState(null); // Use null initially for better checks

  useEffect(() => {
    const fetchProgram = async () => {
      const data = await getProgram(id);
      setProgram(data[0]);

      // Check if map_link exists and update the state accordingly
      if (data[0]?.map_link) {
        setMapButton(true);
      }
    };

    fetchProgram();
  }, [id]); // Include id as a dependency

  if (!program) {
    return <div>Loading...</div>; // Loading state while fetching
  }


  const requirements = program.requirements.split(', ')
  return (
    <>
      <h1>{program.name}</h1>
      <h3>Title: {program.description}</h3>
      <h3>Cost: ${program.cost}</h3>
      <h3>{program.program_summary}</h3>
      {/* <h3>Requirements: {program.requirements}</h3> */}
      <ul>
        {requirements.map(r => (
          <li key={r}>{r}</li>
        ))}
      </ul>
      <img className="programImage" src={program.image} alt={program.name} />
      <h3>Find Out More: <Link to={program.url}>{program.url}</Link></h3>

      {mapButton && (
        <Link to={program.map_link}>
          <button>Google Maps</button>
        </Link>
      )}
    </>
  );
}

export default ProgramInfo;
