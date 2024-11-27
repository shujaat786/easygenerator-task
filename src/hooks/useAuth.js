import {useState} from 'react';
import axiosInstance from '../api/axios';

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const signUp = async (email, name, password) => {
        try {
            setLoading(true);
            setError(null);

            const response = await axiosInstance.post('/sign-up', {email, name, password});
            setLoading(false);
            return response.data;
        } catch (err) {
            setLoading(false);
            const errorMessage = err.response?.data?.message || 'Something went wrong';
            setError(errorMessage);
            throw new Error(errorMessage);
        }
    };

    const signIn = async (email, password) => {
        try {
            setLoading(true);
            setError(null);

            const response = await axiosInstance.post('/sign-in', {email, password});
            setLoading(false);
            return response.data;
        } catch (err) {
            setLoading(false);
            const errorMessage = err.response?.data?.message || 'Invalid credentials';
            setError(errorMessage);
            throw new Error(errorMessage);
        }
    };

    return {signUp, signIn, loading, error};
};
