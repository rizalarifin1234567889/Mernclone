import React, { useState, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from "../Axios/axios.js";
import TokenContext from '../context/TokenContext.js';

function Login() {
    const [formData, setFormData] = useState({});
    const { userToken, tokenDispatch, userDispatch } = useContext(TokenContext);
    const [error, setError] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post("/user/login", formData);
            tokenDispatch({ type: "SET_TOKEN", payload: result.data.token });
            userDispatch({ type: "SET_USER", payload: result.data.user });
            localStorage.setItem("authToken", JSON.stringify(result.data.token));
        } catch (error) {
            setError({ message: error.response?.data?.message || "An error occurred" });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div>
            {userToken && <Navigate to="/" />}
            <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-500 to-blue-500">
                <div className="container mx-auto flex flex-col md:flex-row p-8 max-w-4xl bg-white rounded-lg shadow-lg">
                    <div className="md:w-1/2 p-8">
                        <h2 className="text-4xl font-bold mb-6 text-gray-800">Login to Your Account</h2>
                        <form method="post" onSubmit={handleSubmit}>
                            <div className="flex justify-center mb-6 space-x-4">
                                <button type="button" className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="w-5 h-5">
                                        <path fill="currentColor" d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                                    </svg>
                                </button>
                                <button type="button" className="p-3 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition duration-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5">
                                        <path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
                                    </svg>
                                </button>
                                <button type="button" className="p-3 bg-blue-800 text-white rounded-full hover:bg-blue-900 transition duration-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-5 h-5">
                                        <path fill="currentColor" d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
                                    </svg>
                                </button>
                            </div>
                            <p className="text-center text-gray-600 mb-4">Or login with your email</p>
                            {error && (
                                <div className="mb-4 text-center text-red-600 bg-red-200 p-3 rounded-lg shadow">
                                    {error.message}
                                </div>
                            )}
                            <div className="mb-4">
                                <input
                                    type="text"
                                    name="email"
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Email address"
                                    aria-label="Email address"
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Password"
                                    aria-label="Password"
                                />
                            </div>
                            <div className="flex items-center justify-between mb-6">
                                <label className="flex items-center">
                                    <input type="checkbox" className="form-checkbox text-blue-600" aria-label="Remember me" />
                                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                                </label>
                                <Link to="/forgotPassword" className="text-sm text-blue-600 hover:underline">Forgot Password?</Link>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                            >
                                Login
                            </button>
                            <div className="text-center mt-4">
                                <p className="text-sm text-gray-600">
                                    Don't have an account?{" "}
                                    <Link to="/register" className="text-blue-600 hover:underline">
                                        Register
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                    <div className="hidden md:flex md:w-1/2 bg-gradient-to-b from-teal-400 to-blue-600 rounded-r-lg">
                        <div className="flex items-center justify-center h-full text-white text-2xl font-semibold">
                            Welcome Back!
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Login;
