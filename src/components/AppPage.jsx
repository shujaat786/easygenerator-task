import React from 'react';

import {useNavigate} from 'react-router-dom';

const AppPage = () => {


    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/');
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold text-gray-800">Welcome to the application</h1>
            <button
                onClick={handleLogout}
                className="mt-8 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600"
            >
                Logout
            </button>
        </div>
    );
};

export default AppPage;
