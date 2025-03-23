import ExerciseItem from './ExerciseItem';

function MovieCollection({exercises, onDelete, onEdit}) {
    return (
        <table className="collection-container">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Reps</th>
                    <th>Weight</th>
                    <th>kgs or lbs</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {exercises.map((exercise, i) => 
                <ExerciseItem exercise={exercise}
                onDelete={onDelete} onEdit={onEdit} key={i} />)}
            </tbody>
        </table>

    );
}

export default MovieCollection;