import './App.css';
import { connect } from 'react-redux';
import {BrowserRouter as Router,Routes, Route} from "react-router-dom";
import Home from './Pages';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import 'animate.css';
import Network from './Pages/Network';
import { useEffect } from 'react';
import { getUserAuth } from './actions';
import Register from './Pages/Register';

function App(props) {
  useEffect(() => {
    props.getUserAuth();
  }, [props]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/inscribete" element={<Register/>}/>
        <Route path="/iniciar-sesion" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/dashboard/mi-red" element={<Network/>}/>
      </Routes>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {};
}

const mapDispatchToProps = (dispatch) => ({
  getUserAuth: () => dispatch(getUserAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
