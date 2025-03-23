import mongoose, { isObjectIdOrHexString } from 'mongoose';
import 'dotenv/config';

const EXERCISE_DB_NAME = 'exercises_db'
const EXERCISE_COLLECTION = 'exercises'
const EXERCISE_CLASS = 'Exercise'

let connection = undefined;
let Exercise = undefined


/**
 * This function connects to the MongoDB server.
 */

async function connect(dropCollection){
    try{
        await mongoose.connect(process.env.MONGODB_CONNECT_STRING,
            {dbName: EXERCISE_DB_NAME});
        connection = mongoose.connection;
        console.log("Successfully connected to MongoDB using Mongoose!");
        if(dropCollection){
            await connection.db.dropCollection(EXERCISE_COLLECTION);
        }
        Exercise = createModel();
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`)
    }
}

function createModel(){
    //defines the schema
    const exerciseSchema = mongoose.Schema({
        name: {type: String, minlength: 1, required: true},
        reps: {type: Number, min: 1, required: true},
        weight: {type: Number, min: 1, required: true},
        unit: {type: String, enum: ['kgs', 'lbs'], lowercase: true, required: true},
        date: {type: String, required: true}
    });
    //compile the model class from the schema
    //should be compiled after the schema
    return mongoose.model(EXERCISE_CLASS, exerciseSchema);
}

//Create part of CRUD
async function createExercise(name, reps, weight, unit, date) {
    const exercise = await new Exercise({name: name, reps: reps, weight: weight, 
        unit: unit, date: date});
    return exercise.save();
}

//Read part of CRUD
async function findExercise(filter) {
    const query = await Exercise.find(filter);
    return query;
}

async function findExerciseById(_id) {
    const query = await Exercise.findById(_id)
    return query;
}

//Update part of CRUD
async function updateExercise(_id, name, reps, weight, unit, date) {
    const result = await Exercise.findByIdAndUpdate({_id: _id}, 
        {name: name, reps: reps, weight: weight, unit: unit, date: date},
    {new: true, runValidators: true});
    return result;
} 

//Delete part of CRUD
async function deleteExerise(filter) {
    const result = await Exercise.deleteMany(filter);
    return result.deletedCount;
}

//Delete part of CRUD
async function deleteById(_id) {
    const result = await Exercise.findByIdAndDelete({_id: _id});
    return result

}

function isDateValid(date) {
    // Test using a regular expression. 
    // To learn about regular expressions see Chapter 6 of the text book
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}

export {connect, deleteById, createModel, createExercise, findExercise, findExerciseById, updateExercise, deleteExerise, isDateValid}