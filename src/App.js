import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import ApplicationPage from "./pages/ApplicationPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/signup"/>}/>
                <Route path="/signup" element={<SignupPage/>}/>
                <Route path="/signin" element={<SigninPage/>}/>
                <Route path="/application" element={<ApplicationPage/>}/>
            </Routes>
        </Router>
    );
}

export default App;
