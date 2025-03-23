import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


export const editExercisePage = ({exerciseToEdit}) => {

    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date);
    const navigate = useNavigate();

    const editExercise = async () => {
        const editedExercise = {name, reps, weight, unit, date};
        const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify(editedExercise),
            headers: { 'Content-Type': 'application/json'}
        });
        if(response.status === 200){
            alert("Successfully edited the exercise!");
        } else {
            alert(`Failed to edit the exercise, status code = ${response.status}`);
        }
        navigate("/");
    };

    return (
        <form>
            <h1>Jacob's Exercise Log</h1>
            <p>Create and log your exercises, but if you made a mistake you can fix it no problem</p>
            <legend>Exercise information</legend>
            <label>
                <input
                    type="text"
                    placeholder="Name of exercise?"
                    value={name}
                    onChange={e => setName(e.target.value)} />
            </label>
            <label>
                <input
                    type="number"
                    value={reps}
                    placeholder="# of reps?"
                    onChange={e => setReps(e.target.valueAsNumber)} />
            </label>
            <label>
                <input
                    type="number"
                    value={weight}
                    placeholder="Enter how much weight"
                    onChange={e => setWeight(e.target.valueAsNumber)} />
            </label>
            <label>   
                <input
                    type="text"
                    placeholder="kgs or lbs"
                    value={unit}
                    onChange={e => setUnit(e.target.value)} />
            </label>
            <label>  
                <input
                    type="text"
                    placeholder="Enter date as MM-DD-YY"
                    value={date}
                    onChange={e => setDate(e.target.value)} />
            </label>         
            <button onClick={editExercise}> Create</button>
            <footer>Jacob Stewart copyright © 1995-2025</footer>
        </form>
    );
}

export default editExercisePage;