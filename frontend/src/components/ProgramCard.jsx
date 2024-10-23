export default function ProgramCard({ program }) {

    return (
        <div>
            <h2>Program Name:{program.name}</h2>
            <p>Description:{program.description}</p>
        </div>
    );
}