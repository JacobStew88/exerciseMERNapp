import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


export const CreateExercisePage = () => {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');
    const navigate = useNavigate();

    const createExercise = async () => {
        const newExercise = {name, reps, weight, unit, date};
        const response = await fetch('/exercises', {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: { 'Content-Type': 'application/json'}
        });
        if(response.status === 201){
            alert("Successfully added the exercise!");
        } else {
            alert(`Failed to add exercise, status code = ${response.status}`);
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
            <button onClick={createExercise}> Create</button>
            <footer>Jacob Stewart copyright © 1995-2025</footer>
        </form>
    );
}

export default CreateExercisePage;