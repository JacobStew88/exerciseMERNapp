import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import EditExercisePage from './pages/EditExercisePage'
import CreateExercisePage from './pages/CreateExercisePage'
import HomePage from './pages/HomePage'
import { useState } from 'react'
import Navigation from './components/Navigation'

function App() {

  const [exerciseToEdit, setExerciseToEdit] = useState();

  return (
      <div className="app">
        <Router>
          <Navigation/>
          <Routes>
            <Route path="/" element={<HomePage 
            setExerciseToEdit={setExerciseToEdit}/>}></Route>
            <Route path="/edit-exercisepage" element={<EditExercisePage 
            exerciseToEdit={exerciseToEdit}/>}></Route>
            <Route path="/create-exercisepage" element={<CreateExercisePage />}></Route>
          </Routes>
        </Router>
      </div>
  )
}

export default App
