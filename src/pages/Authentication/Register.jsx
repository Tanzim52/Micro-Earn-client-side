import Lottie from 'lottie-react';
import React, { useState } from 'react';
import registerAnimation from '../../../public/register.json'
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../src/assets/μ-Earn_fav_icon_with_no_background-removebg-preview.png'
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useAuth from '../../Hooks/useAuth';
const Register = () => {
    const navigate =useNavigate();
    const {createUser,updateUserProfile} = useAuth();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    const password = watch("password");

    const handleImageUpload = async (file) => {
        const formData = new FormData();
        formData.append("image", file);
        const profile = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGEBB_API_KEY}`, formData);
        return profile.data.data.url;
    }
    const onSubmit = async (data) => {
        const { profile_pic, name,user_role, password, email } = data;
        try {
            const imageUrl = await handleImageUpload(profile_pic[0]);
             const firebaseUid = await createUser(email,password);
             const firebaseUID = firebaseUid.user.uid
             await updateUserProfile(name,imageUrl);
            const user ={
                firebaseUid:firebaseUID, 
                name: name,
                email: email,
                imageUrl:imageUrl,
                user_role:user_role,
                coins: 0
            }
            const userCollection = await axios.post(`${import.meta.env.VITE_BASE_URL}/user`,user)
            if(userCollection.data.insertedId){
                toast.success("User created successfully")
                navigate('/')
            }
            
        }
        catch (error) {
            toast.error("User already exists");
        }
    }
    
    return (
        <div className=" flex md:flex-row flex-col-reverse gap-6 bg-base-200 dark:bg-gray-900 dark:text-white min-h-screen">
            <div className="w-full pt-20">
                <Lottie animationData={registerAnimation} loop={true}></Lottie>
            </div>
            <div className="bg-base-100 space-y-4 py-10 px-10 w-full">
                <Link to="/" className="text-3xl -ml-2 flex items-center font-bold text-gray-700 tracking-wider"><img className='h-12' src={logo} alt="" />μ-Earn</Link>
                <h2 className='text-3xl text-black'>Sign Up Account</h2>
                <p className='text-black'>Please fill all the required form to create an account in μ-Earn.</p>
                <form onSubmit={handleSubmit(onSubmit)} className=''>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text ">Full Name<span className='text-red-500 text-xl ml-1'>*</span></span>
                        </label>
                        <input type="text" {...register("name", { required: true })} name='name' placeholder="Full Name" className=" py-3 border-2 rounded-none transition text-gray-700 outline-secondary shadow px-2" />
                        {errors.name && <span className='text-secondary'>Name field is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text ">Email<span className='text-red-500 text-xl ml-1'>*</span></span>
                        </label>
                        <input type="email" {...register("email", { required: true })} name='email' placeholder="email" className=" py-3 border-2 rounded-none transition text-gray-700 px-2 outline-secondary shadow" />
                        {errors.email && <span className='text-secondary'>Email field is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text ">Password<span className='text-red-500 text-xl ml-1'>*</span></span>
                        </label>
                        <input type="password"
                            {...register("password", { required: true, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/ })}
                            name='password' placeholder="password" className=" py-3 border-2 rounded-none text-gray-700 transition px-2 outline-secondary shadow" />
                        {errors.password && <span className='text-secondary'>Password is required and Minimum six characters, at least one letter and one number</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text ">Confirm Password<span className='text-red-500 text-xl ml-1'>*</span></span>
                        </label>
                        <input type="password"
                            {...register("confirmPassword", { validate: (value) => value === password || "Passwords do not match", })}
                            name='confirmPassword' placeholder="confirm password" className=" py-3 border-2 text-gray-700 rounded-none transition px-2 outline-secondary shadow" />
                        {errors.confirmPassword && (
                            <span className="text-secondary">{errors.confirmPassword.message}</span>
                        )}
                    </div>
                    <div className="form-control text-black">
                        <label className="label">
                            <span className="label-text ">Select Role<span className='text-red-500 text-xl ml-1'>*</span></span>
                        </label>
                        <select name='user_role' {...register("user_role", { required: true })} className="py-3 border-2 rounded-none transition placeholder:px-2 outline-secondary shadow">
                            <option disabled value="Select a role">Select a role</option>
                            <option value="worker">Worker</option>
                            <option value="buyer">Buyer</option>
                        </select>
                        {errors.user_role && (
                            <p className="text-secondary">Please select a user</p>
                        )}
                    </div>
                    <div className="form-control text-black">
                        <label className="label">
                            <span className="label-text ">Profile Picture<span className='text-red-500 text-xl ml-1'>*</span></span>
                        </label>
                        <input {...register("profile_pic")} type="file" name="profile_pic" className="file-input file-input-bordered w-full rounded-none transition shadow" />
                      
                    </div>
                    <div className="form-control mt-6">
                        <button type='submit' className="btn btn-primary text-white text-xl rounded-none">Register</button>
                    </div>
                </form>
                <div className='mt-2'>
                    <p className='text-black text-lg'>Already have an account? <Link to="/login" className='text-secondary font-semibold hover:underline'>Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;