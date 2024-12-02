import React, {useState} from 'react';
import {useAuth} from '../hooks/useAuth';
import {Link, useNavigate} from 'react-router-dom';
import Toast from '../components/Toast';

const SignInForm = () => {
    const {signIn, loading, error} = useAuth();
    const [formData, setFormData] = useState({email: '', password: ''});
    const navigate = useNavigate();
    const [toast, setToast] = useState(null);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {email, password} = formData;

        try {
            const result = await signIn(email, password);
            if (result && result.token) {
                setToast({message: 'Signed in successfully!', type: 'success'});
                setTimeout(() => navigate('/application'), 1000);
            }
        } catch (err) {
            setToast({message: 'Invalid credentials. Please try again.', type: 'error'});
        }
    };

    return (
        <div className="relative w-full max-w-md mx-auto mt-6">
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
                <h2 className="text-4xl font-bold text-center">Sign In</h2>

                <div>
                    <label className="block mb-2 text-lg font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-4 text-lg"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-2 text-lg font-medium">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-4 text-lg"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-4 text-lg rounded-lg hover:bg-blue-600"
                    disabled={loading}
                >
                    {loading ? 'Signing In...' : 'Sign In'}
                </button>
                <p className="text-center text-gray-500 text-sm">
                    Don’t have an account?{' '}
                    <Link
                        to="/signup"
                        className="text-blue-500 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
            </form>


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

export default SignInForm;
