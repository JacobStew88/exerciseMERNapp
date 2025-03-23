import { Link, useNavigate } from 'react-router-dom';
import ExerciseCollection from '../components/ExerciseCollection';
import { useEffect, useState} from 'react';

function HomePage({setExerciseToEdit}) {
    const [exercises, setExercise] = useState([]);
    const navigate = useNavigate();
    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const exercises = await response.json();
        setExercise(exercises);
      }
      
    useEffect(() => {
    loadExercises(); 
    }, []);

    const onDelete = async (_id) => {
        const response = await fetch(`/exercises/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
        setExercise(exercises.filter(e => e._id !== _id));
        } else {
          console.error(`Failed to delete exercise with id = ${_id}, status code = ${response.status}`)
        }
      }

    const onEdit = async (exercise) => {
        setExerciseToEdit(exercise)
        navigate("/edit-exercisepage")

    }

    return (
        <div className='exercise-table'>
            <h1>Jacob's Exercise Log</h1>
            <p>Create and log your exercises, but if you made a mistake you can fix it no problem</p>
            <ExerciseCollection exercises={exercises} onDelete={onDelete} onEdit={onEdit}></ExerciseCollection>
            <footer>Jacob Stewart copyright © 1995-2025</footer>
        </div>
    );
}

export default HomePage;
