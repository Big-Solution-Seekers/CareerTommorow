import { useNavigate } from "react-router-dom";

export default function ProgramCard({ program }) {
    const navigate = useNavigate()

    const handleSingleProgram = (e) => {
        let id = null;
        if (e.target.parentNode.className === "program-card") 
            id = e.target.parentNode.getAttribute("data-program-id");
        else 
            id = e.target.getAttribute("data-program-id");
        navigate(`/program/${id}`);
    };

    return (
        <div className="program-card" onClick={handleSingleProgram} data-program-id={program.id}>
            <h4>{program.name}</h4>
            <p>{program.description}</p>
        </div>
    );
}