// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import Login from './components/Login';
import PassSet from './components/PassSet';
import axios from "axios"

axios.defaults.baseURL = "http://localhost:8000"
axios.defaults.withCredentials = true
function App() {
  return (
    <Router>
      <div className="flex justify-center items-center h-screen w-full">
        <Routes>
          <Route path="/signup" element={
            <Signup />}/>
          <Route path="/forgot-password" element={<ForgotPassword />}/>
          <Route path="/pass-strength" element={<PassSet/>}/>
            
          <Route path="/" element={<Login />}/>
            
        </Routes>
      </div>
    </Router>
  );
}

export default App;
