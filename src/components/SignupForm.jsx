import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from "react-router-dom";
import Toast from '../components/Toast';

const SignUpForm = () => {
    const { signUp, loading } = useAuth();
    const [formData, setFormData] = useState({ email: '', name: '', password: '' });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [toast, setToast] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors((prevErrors) => ({
            ...prevErrors,
            [e.target.name]: '',
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email format.';
        }
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required.';
        }
        if (!formData.password.trim()) {
            newErrors.password = 'Password is required.';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        try {
            const result = await signUp(formData.email, formData.name, formData.password);
            if (result) {
                setToast({ message: 'Sign-up successful! Redirecting...', type: 'success' });
                setFormData({ email: '', name: '', password: '' });
                setTimeout(() => navigate('/application'), 1500);
            }
        } catch (err) {
            setToast({ message: err.message || 'Sign-up failed. Please try again.', type: 'error' });
        }
    };

    return (
            <div className="relative w-full max-w-lg mx-auto mt-6">
            {/* Logo */}
            <div className="flex justify-center mb-4">
                <Link to="/">
                    <img
                        src="https://assets.easygenerator.com/fragment/auth-page/2024.09.20.master-1580d78a0f/fe2d0604cd7c37cb56fba71cae72c2e6.svg"
                        alt="easygenerator logo"
                        style={{ height: '40px' }}
                    />
                </Link>
            </div>

            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-md shadow-lg space-y-4"
            >
                <h2 className="text-4xl font-bold text-center">Sign Up</h2>
                {/* Email Field */}
                <div>
                    <label className="block mb-1 text-sm font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full border p-2 text-sm rounded-md ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Name Field */}
                <div>
                    <label className="block mb-1 text-sm font-medium">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full border p-2 text-sm rounded-md ${
                            errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Password Field */}
                <div>
                    <label className="block mb-1 text-sm font-medium">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full border p-2 text-sm rounded-md ${
                            errors.password ? 'border-red-500' : 'border-gray-300'
                        }`}
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 text-sm rounded-md hover:bg-blue-600"
                    disabled={loading}
                >
                    {loading ? 'Signing Up...' : 'Sign Up'}
                </button>

                <p className="text-center text-gray-500 text-sm">
                    Already have an account?{' '}
                    <Link
                        to="/signin"
                        className="text-blue-500 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
            </form>

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

export default SignUpForm;
