import Lottie from 'lottie-react';
import React from 'react';
import login from '../../../public/login.json'
import { Link, useNavigate } from 'react-router-dom';
// import logo from '../../../public/icons8-p-button-96.png'
import { FaGoogle } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import { toast } from 'react-toastify';
import axios from 'axios';
const Login = () => {
    const { signIn, signInWithGoogle,forgetPassword } = useAuth();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        const { email, password } = data
        try {
            await signIn(email, password)
            toast.success("Login successful!");
            navigate("/");
        }
        catch (error) {
            toast.error("Something went wrong. Please try again.");
        }
    }
    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithGoogle()
            const user = {
                firebaseUid: result.user.uid,
                name: result.user.displayName,
                email: result.user.email,
                imageUrl: result.user.photoURL,
                user_role: "worker",
                coins: 0
            }
            const { data: existingUser } = await axios.get(`${import.meta.env.VITE_BASE_URL}/user`, {
                params: { email: user.email }, // Pass email to check if the user exists
            });
            if (existingUser) {
                toast.info("Welcome back!");
            }
            else {
                await axios.post(`${import.meta.env.VITE_BASE_URL}/user`, user)
                toast.success("Account created successfully!");
            }
            navigate("/");
        }
        catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                // Handle other errors
                toast.error(error.message);
            }
        }
    }
     const forgetEmail =watch("email"); // react hook form (watch) input value like useRef() hook
    const handleForgetPassword = () => {
        forgetPassword(forgetEmail);
        toast.info("Please check your email to reset your password.");
    }
    return (
        <div className=" flex md:flex-row-reverse flex-col-reverse gap-6 bg-base-200 dark:bg-gray-900 dark:text-white min-h-screen">
            <div className="w-full pt-10">
                <Lottie animationData={login} loop={true}></Lottie>
            </div>
            <div className="bg-base-100 space-y-4 py-10 px-10 w-full">
                <Link to="/" className="text-3xl -ml-2 flex items-center font-bold text-gray-700 tracking-wider"> μ-Earn</Link>
                <h2 className='text-3xl text-black'>Log in Account</h2>
                <p className='text-black'>Please log in your account to access your all data.</p>
                <form onSubmit={handleSubmit(onSubmit)} className=''>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text ">Email<span className='text-red-500 text-xl ml-1'>*</span></span>
                        </label>
                        <input type="email" {...register("email", { required: true })} name='email' placeholder="email" className=" text-gray-700 py-3 border-2 rounded-none transition px-2 outline-secondary shadow" required />
                        {errors.email && <span className='text-secondary'>Email field is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text ">Password<span className='text-red-500 text-xl ml-1'>*</span></span>
                        </label>
                        <input type="password"
                            {...register("password", { required: true, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/ })}
                            name='password' placeholder="password" className=" text-gray-700 py-3 border-2 rounded-none transition px-2 outline-secondary shadow" required />
                        {errors.password && <span className='text-secondary'>password field is required</span>}
                        <label className="my-2">
                            <button type='button' onClick={handleForgetPassword} className=" text-secondary hover:text-secondary hover:underline font-medium ">Forgot password?</button>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button type='submit' className="btn btn-primary text-white text-xl rounded-none">Login</button>
                    </div>
                    <div className='mt-2'>
                        <p className='text-black text-lg'>Don't have any account? <Link to="/register" className='text-secondary font-semibold hover:underline'>Register</Link></p>
                    </div>
                </form>
                <div className="form-control mt-6">
                    <button onClick={handleGoogleLogin} className="btn bg-secondary border text-xl rounded-none border-secondary hover:bg-[#f98633] hover:border-[#f98633] text-white"><FaGoogle /> Login with Google</button>
                </div>
            </div>
        </div>
    );
};

export default Login;