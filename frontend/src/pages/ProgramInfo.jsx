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

export default ProgramInfo;


.programInfoContainer {
  display: flex;
  align-items: flex-start; /* Align items at the start */
  gap: 20px; /* Space between image and details */
}

.programImageContainer {
  display: flex;
  flex-direction: column; /* Stack image and button vertically */
  align-items: center; /* Center the image and button */
}

.programImage {
  max-width: 100%; /* Ensure the image is responsive */
  height: auto; /* Maintain aspect ratio */
}

.mapButton {
  margin-top: 10px; /* Space between the image and button */
}

.programDetails {
  flex: 1; /* Allow this section to take up remaining space */
}


@media (max-width: 768px) {
  .card {
      flex: 1 1 100%; /* full width on mobile */
  }
}