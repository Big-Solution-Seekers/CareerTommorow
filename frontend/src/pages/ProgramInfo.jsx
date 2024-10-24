import { useParams } from "react-router-dom"
import { getProgram } from "../adapters/programs-adapters"
import { useState, useEffect } from "react"

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
    </>
  );
}

export default ProgramInfo;