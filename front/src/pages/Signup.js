import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../components/slice/Auth';
import toast from 'react-hot-toast';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

export default function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        terms: false,
    });

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    function togglePasswordVisibility() {
        setPasswordVisible(!passwordVisible);
    }

    function toggleConfirmPasswordVisibility() {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    }

    function changeHandler(event) {
        // setFormData((prev) =>{ return {...prev}});
        setFormData((prev) => {
            const { name, value, checked, type } = event.target;
            return {
                ...prev,
                [name]: type === "checkbox" ? checked : value,
            };
        });
    }

    async function submitHandler(event) {
        event.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Password & Confirm Password doesn't match!!");
            setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                terms: false,
            })
            return;
        }

        try {
            const user = await axios.post("http://localhost:5000/signup", formData);
            toast.success(`Welcome ${formData.name} you just Registered!!!`, {
                duration: 5000,
                position: 'top-center',

                // Styling
                style: {},
                className: '',

                // Custom Icon
                icon: '👏',

                // Change colors of success/error/loading icon
                iconTheme: {
                    primary: '#000',
                    secondary: '#fff',
                },

                // Aria
                ariaProps: {
                    role: 'status',
                    'aria-live': 'polite',
                },
            });
            if (user) {
                dispatch(setToken(user.data.token))
                localStorage.setItem('token', JSON.stringify(user?.data?.token));
            }
            navigate("/home");
        } catch (error) {
            console.log(error);
        }

        // console.log(formData);
        setFormData({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            terms: false,
        })
    }

    return (
        <div className="flex h-screen bg-black flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-white">Sign Up to your account</h2>
            </div>

            <div className="mt-10 p-8 border border-red-400 shadow-md shadow-yellow-400 sm:mx-auto sm:w-full sm:max-w-lg">
                <form className="space-y-6" onSubmit={submitHandler}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-cyan-200">Name</label>
                        <div className="mt-2">
                            <input id="name" name="name" onChange={changeHandler} value={formData.name} type="text" placeholder='Enter your Name' required className="block w-full rounded-md border-0 px-3 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-cyan-200">Email address</label>
                        <div className="mt-2">
                            <input id="email" name="email" type="email" onChange={changeHandler} value={formData.email} placeholder='Email ID' required className="block w-full rounded-md border-0 px-3 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-cyan-200">Password</label>
                            <button type="button" onClick={togglePasswordVisibility} className="text-cyan-200 mr-2">
                                {passwordVisible ? <BsEye size={25} /> : <BsEyeSlash size={25} />}
                            </button>
                        </div>
                        <div className="mt-2">
                            <input id="password" name="password" type={passwordVisible ? "text" : "password"} onChange={changeHandler} value={formData.password} placeholder='Password' required className="block w-full rounded-md border-0 px-3 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-cyan-200">Confirm Password</label>
                            <button type="button" onClick={toggleConfirmPasswordVisibility} className="text-cyan-200 mr-2">
                                {confirmPasswordVisible ? <BsEye size={25} /> : <BsEyeSlash size={25} />}
                            </button>
                        </div>
                        <div className="mt-2">
                            <input id="confirmPassword" name="confirmPassword" type={confirmPasswordVisible ? "text" : "password"} onChange={changeHandler} value={formData.confirmPassword} placeholder='Confirm your Password' required className="block w-full rounded-md border-0 px-3 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div className="flex items-center">
                        <input id="terms" name='terms' type="checkbox" required onChange={changeHandler} value={formData.terms} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                        <label htmlFor="terms" className="ms-2 text-sm font-medium text-cyan-200">I agree with the <a href="/" className="text-blue-600 hover:underline">terms and conditions</a>.</label>
                    </div>

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 px-3 py-2 text-lg font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                    </div>
                </form>

            </div>
        </div>
    )
}
