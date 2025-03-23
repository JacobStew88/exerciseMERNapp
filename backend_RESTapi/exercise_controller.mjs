import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as exercises from './exercise_model.mjs';
import {body, validationResult } from 'express-validator'

const app = express();
app.use(express.json())
app.use(express.static('public'))

const PORT = process.env.PORT;

app.listen(PORT, async () => {
    await exercises.connect(false)
    console.log(`Server listening on port ${PORT}...`);
});


app.post('/exercises', 
  body('date').custom(date =>{
    return exercises.isDateValid(date);
  }),
  asyncHandler(async (req, res) => {
    try{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      return res.status(400).json({error: "invalid request"});
    }
    const newExercise = await exercises.createExercise(req.body.name, 
      req.body.reps, req.body.weight, req.body.unit, req.body.date)
    res.status(201).json(newExercise);
    }
    catch(err){
      res.status(400).send({Error: "invalid request"});
    }
    }));


app.get('/exercises', asyncHandler(async (req, res) => {
    try {
        const filter = {};
        if (req.query.name){
            filter.name = req.query.name;
        }
        if (req.query.reps){
            filter.reps = req.query.reps;
        }
        if (req.query.weight){
            filter.email = req.query.weight
        }
        if(req.query.unit){
            filter.unit = req.query.unit
        }
        if(req.query.date){
          filter.date = req.query.date
        }
        const exercise = await exercises.findExercise(filter);
        res.status(200).json(exercise);
    } catch (err) {
      res.status(400).send({error: "invalid request"});
    }
  }));


app.get('/exercises/:_id', asyncHandler(async (req, res) => {
    try {
        const id = req.params._id
        const exercise = await exercises.findExerciseById(id);
        if (!exercise) {
            return res.status(404).send({'Error': 'not found'});
      }
      res.status(200).json(exercise);
    } catch (err) {
      res.status(404).send({'Error': 'not found'});
    }
  }));


  app.put('/exercises/:_id', 
    body('date').custom(date =>{
      return exercises.isDateValid(date);
    }),
    asyncHandler(async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()){
        return res.status(400).json({error: "invalid request"});
      }
        const id = req.params._id;
        const exercise = await exercises.updateExercise(id, req.body.name, 
          req.body.reps, req.body.weight, req.body.unit, req.body.date);
        if (exercise) {
          res.status(200).json(exercise);
      }
        else{
          res.status(404).send({'Error': 'not found'});
        }
      
    } catch (err) {
      res.status(400).send({Error: "Invalid request"});
    }
  }));


  app.delete('/exercises', asyncHandler(async (req, res) => {
    try {
      const filter = {};
      if (req.query.name){
          filter.name = req.query.name;
      }
      if (req.query.reps){
          filter.reps = req.query.reps;
      }
      if (req.query.weight){
          filter.email = req.query.weight
      }
      if(req.query.unit){
          filter.unit = req.query.unit
      }
      if(req.query.date){
        filter.date = req.query.date
      }
      const exercise = await exercises.findExercise(filter);
      res.status(204).json(exercise);
  } catch (err) {
    res.status(400).send({error: "Not Found"});
  }
}));


  app.delete('/exercises/:_id', asyncHandler(async (req, res) => {
    try {
      const id = req.params._id
      const exercise = await exercises.deleteById(id);
      if (!exercise) {
        return res.status(404).send({'Error': 'not found'});
      }
      res.status(204).json(exercise);
    } catch (err) {
      res.status(404).send({error: "Not Found"});;
    }
  }));