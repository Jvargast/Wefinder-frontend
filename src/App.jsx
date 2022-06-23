import './App.css';
import {BrowserRouter as Router,Routes, Route} from "react-router-dom";
import Home from './Pages';
import Signin from './Pages/Signin';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import 'animate.css';
import Network from './Pages/Network';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/inscribete" element={<Signin/>}/>
        <Route path="/iniciar-sesion" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/dashboard/mi-red" element={<Network/>}/>
      </Routes>
      
    </Router>
  );
}

export default App;
