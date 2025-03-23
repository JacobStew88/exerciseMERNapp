import '../App.css';
import { Gi3dHammer, GiBoltBomb } from "react-icons/gi";

function ExerciseItem({exercise, onDelete, onEdit}) {
    return (
        <tr className="collection-item">
            <td>{exercise.name} </td>
            <td>{exercise.reps} </td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date}</td>
            <td>
            <a href="/" onClick={e => {e.preventDefault(); onEdit(exercise)}}> <Gi3dHammer/></a>
            <span> EDIT or DELETE </span>
            <a href="/" onClick={e => {e.preventDefault(); onDelete(exercise._id)}}> <GiBoltBomb/> </a>
            </td> 
        </tr>
    );
}

export default ExerciseItem;