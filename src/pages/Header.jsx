import React from 'react';
import {useNavigate} from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem('authToken');
        navigate('/signin');
    };

    const goToHomePage = () => {
        navigate('/home');
    };

    return (
        <header className="bg-orange-400 text-white">
            <div className="container mx-auto flex justify-between items-center py-4 px-6">
                <h1 className="text-2xl font-bold">Easy generator assignment</h1>
                <nav className="flex space-x-4">
                    <button
                        onClick={handleSignOut}
                        className="bg-blue-500 hover:bg-red-700 text-white px-4 py-2 rounded"
                    >
                        Sign Out
                    </button>
                </nav>
            </div>
        </header>
    );
};

export default Header;
