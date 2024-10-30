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

  return (
    <>
      <h1 className="programTitle">{program.name}</h1>
      <div className="programInfoContainer">
        <div className="programImageContainer">
          <img className="programImage" src={program.image} alt={program.name} />
          {mapButton && (
            <Link to={program.map_link}>
              <button className="mapButton">Google Maps</button>
            </Link>
          )}
        </div>
        <div className="programDetails">
          <h3>{program.description}</h3>
          <h3>Cost: {program.cost}</h3>
          <h3>Summary: {program.program_summary}</h3>
          <h3>Requirements: {program.requirements}</h3>
          <h3>Find Out More: <Link to={program.url}>{program.url}</Link></h3>
        </div>
      </div>
    </>
  );
}


export default ProgramInfo