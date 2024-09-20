import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import MyCalendar from './components/pages/Calendar';
import Signin from './components/pages/Signin'
import FailAlert from './components/Alert/FailAlert';
import SuccessAlert from './components/Alert/SuccessAlert';


function App() {

  const [successAlert, setSuccessAlert] = useState({visible:false, msg:'Success'});
  const [successTimeoutID, setSuccessTimeoutID] = useState(null);
  const [failAlert, setFailAlert] = useState({visible:false, msg:'Fail'});
  const [failTimeoutID, setFailTimeoutID] = useState(null);

  useEffect(() => {
    if(successAlert.visible) {
      const timeoutID = setTimeout(() => {
        setSuccessAlert({visible:false, msg:'Success'});
      }, 5000);
      setSuccessTimeoutID(timeoutID);
    } else {
      clearTimeout(successTimeoutID)
    }
  }, [successAlert]);

  useEffect(() => {
    if(failAlert.visible) {
      const timeoutID = setTimeout(() => {
        setFailAlert({visible:false, msg:'Fail'});
      }, 5000);
      setFailTimeoutID(timeoutID);
    } else {
      clearTimeout(failTimeoutID)
    }
  }, [failAlert]);
  


  return (
    <Router basename="/">
        <div className="w-full h-full">
        <Routes>
          <Route
            path={'/signin'}
            element={
              <Signin
                setSuccessAlert={setSuccessAlert}
                setFailAlert={setFailAlert}
              />
            }
          />
          <Route
            path={'/calendar'}
            element={
              <div>
                <Header/>
                <MyCalendar
                  setSuccessAlert={setSuccessAlert}
                  setFailAlert={setFailAlert}
                />
              </div>
            }
          />
        
            
      

        </Routes>
        {successAlert.visible &&
          <SuccessAlert
            message={successAlert.msg}
            setSuccessAlert={setSuccessAlert}
          />
        }
        {failAlert.visible &&
          <FailAlert
            message={failAlert.msg}
            setFailAlert={setFailAlert}
          />
        }
        
        </div>
    </Router>
  );
}

export default App;
