import { useParams } from "react-router-dom"
import { getProgram } from "../adapters/programs-adapters"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import '../styles/programPage.css';

const ProgramInfo = () => {
  const { id } = useParams();

  const [program, setProgram] = useState('');

  useEffect(() => {
    const fetch = async () => {
      const data = await getProgram(id);
      setProgram(data[0]);
    }
    fetch();
  }, [])
  console.log(program);

  return (
    <>
      <h1>{program.name}</h1>
      <h3>Title: {program.description}</h3>
      <h3>Cost: ${program.cost}</h3>

      <img src={program.image} />
      <h3>Requirements: {program.requirements}</h3>

      <img className="programImage" src={program.image} />
      <h3>{program.program_summary}</h3>
      <h3>Find Out More: <Link>{program.url}</Link></h3>
      <Link to={program.map_link}>
        <button>Google Maps</button>
      </Link>


    </>
  );
}

export default ProgramInfo;