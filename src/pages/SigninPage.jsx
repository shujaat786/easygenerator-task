import React, { useState } from 'react';
import Toast from '../components/Toast';
import SigninForm from "../components/SigninForm";
import Background from '../components/Background'; // Import Background component

const SigninPage = () => {
    const [toast, setToast] = useState(null);

    const handleToast = (message, type) => {
        setToast({ message, type });
    };

    return (
        <div
            className="relative min-h-screen bg-gradient-to-r from-orange-100 to-orange-500 flex items-center justify-center">
            {/* Pass the handleToast function to the SigninForm */}
            <SigninForm onToast={handleToast} />

            {/* Display Toast */}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
};

export default SigninPage;
