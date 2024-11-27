import React, {useEffect, useState} from 'react';

const Toast = ({message, type = 'success', duration = 3000, onClose}) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setVisible(false);
            if (onClose) onClose();
        }, duration);

        return () => clearTimeout(timeout);
    }, [duration, onClose]);

    if (!visible) return null;

    return (
        <div
            className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-md text-white shadow-lg ${
                type === 'success' ? 'bg-green-500' : 'bg-red-500'
            }`}
        >
            {message}
        </div>
    );
};

export default Toast;
