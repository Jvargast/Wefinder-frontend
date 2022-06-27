import './App.css';
import { connect } from 'react-redux';
import {BrowserRouter as Router,Routes, Route} from "react-router-dom";
import Home from './Pages';
import Signin from './Pages/Signin';
/* import Login from './Pages/Login'; */
import Dashboard from './Pages/Dashboard';
import 'animate.css';
import Network from './Pages/Network';
import { useEffect } from 'react';
import { getUserAuth } from './actions';

function App(props) {
  useEffect(() => {
    props.getUserAuth();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/inscribete" element={<Signin/>}/>
        {/* <Route path="/iniciar-sesion" element={<Login/>}/> */}
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
