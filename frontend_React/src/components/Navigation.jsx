import {Link} from 'react-router-dom'
import '../App.css'

function Navigation(){
    return (
        <nav className="app-nav">
            <Link to="/">Home </Link>
            <Link to="/create-exercisepage"> New Exercise</Link>
        </nav>
    )
}

export default Navigation;

