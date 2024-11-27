import React from 'react';
import Header from './Header';
import {ReactTyped} from "react-typed";

const AppPage = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Header/>

            <div className="mt-16 text-gray-800 text-4xl font-bold w-full text-center z-10">
                <ReactTyped
                    strings={['Welcome to the application!']}
                    typeSpeed={50}
                    backSpeed={30}
                    loop
                />
            </div>
        </div>
    );
};

export default AppPage;
