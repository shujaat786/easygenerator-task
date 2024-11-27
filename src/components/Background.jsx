import React, {useCallback} from 'react';
import {loadFull} from 'tsparticles';
import {ReactTyped} from "react-typed";

const Background = ({children}) => {


    return (
        <div
            className="relative min-h-screen bg-gradient-to-r from-orange-100 to-orange-500 flex items-center justify-center">

            <div className="absolute top-10 text-white text-4xl font-bold w-full text-center z-10">
                <ReactTyped
                    strings={['Sign Up Now!']}
                    typeSpeed={50}
                    backSpeed={30}
                    loop
                />
            </div>

            <div className="relative z-20">{children}</div>
        </div>
    );
};

export default Background;
