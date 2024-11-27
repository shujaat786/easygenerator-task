import React, { useState } from 'react';
import Toast from '../components/Toast';
import SigninForm from "../components/SigninForm"; // Import the reusable Toast component

const SigninPage = () => {
    const [toast, setToast] = useState(null); // Manage toast state

    const handleToast = (message, type) => {
        setToast({ message, type }); // Trigger toast
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center relative">
            {/* Pass the handleToast function to the SigninForm */}
            <SigninForm onToast={handleToast} />

            {/* Display Toast */}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)} // Remove toast after it's closed
                />
            )}
        </div>
    );
};

export default SigninPage;
