import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
    const { user,updateUserProfile } = useAuth();
    const navigate =useNavigate();
     const {
            register,
            handleSubmit,
            watch,
            formState: { errors },
        } = useForm()
        const handleImageUpload = async (file) => {
            const formData = new FormData();
            formData.append("image", file);
            const profile = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGEBB_API_KEY}`, formData);
            return profile.data.data.url;
        }
        const onSubmit = async (data) => {
            const {name,profile_pic} = data;
            try{
                const imageUrl = await handleImageUpload(profile_pic[0]);
                await updateUserProfile(name,imageUrl);
                const userInfo ={
                    name: name,
                    imageUrl:imageUrl,
                }
                
                const userCollection = await axios.patch(`${import.meta.env.VITE_BASE_URL}/update-user/${user?.email}`,userInfo)
                
                if(userCollection.data.modifiedCount > 0) {
                    toast.success("User updated successfully")
                    navigate('/')
                }
            }
            catch(err){
                toast.error(err.message)
            }
        }
    return (
        <div>
            <h1 className='text-4xl text-center font-semibold border-b-2 py-4 uppercase pt-10'>Profile</h1>
            <div className=" bg-base-100 dark:bg-gray-950 dark:text-white">
                <div className="hero-content mt-10 flex-col lg:flex-row">
                    <div className="mr-6 space-y-3">
                        <img className='w-full object-cover h-[250px]' src={user?.photoURL} alt="" />
                        <h1 className="text-2xl "><span className='font-bold'>Name: </span>{user?.displayName}</h1>
                        <p className="text-2xl "><span className='font-bold'>Email: </span>{user?.email}</p>

                    </div>
                    <div className="card bg-base-100 w-full max-w-sm rounded-none shrink-0 shadow-2xl">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text ">DisplayName<span className='text-red-500 text-xl ml-1'>*</span></span>
                                </label>
                                <input type="text" {...register("name", { required: true })} name='name' placeholder="Name" className=" text-gray-700 py-3 border-2 rounded-none transition px-2 outline-secondary shadow" required />
                                {errors.name && <span className='text-secondary'>Name field is required</span>}
                            </div>
                            <div className="form-control text-black">
                                <label className="label">
                                    <span className="label-text ">Profile Picture<span className='text-red-500 text-xl ml-1'>*</span></span>
                                </label>
                                <input {...register("profile_pic", { required: true })}  type="file" name="profile_pic" className="file-input file-input-bordered w-full rounded-none transition shadow" />
                                {errors.profile_pic && <span className='text-secondary'>Profile pic field is required</span>}
                            </div>
                            <div className="form-control mt-6">
                                <button type='submit' className="btn btn-primary text-white text-xl rounded-none">Update profile</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;