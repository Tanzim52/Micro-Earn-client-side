import axios from 'axios';
import moment from 'moment';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FaSackDollar, FaUsers } from 'react-icons/fa6';
import { SlCalender } from 'react-icons/sl';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const TaskDetails = () => {
    const { user,loading,setLoading } = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const task = useLoaderData();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    const handleImageUpload = async (file) => {
        const formData = new FormData();
        formData.append("image", file);
        const task_image = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGEBB_API_KEY}`, formData);
        return task_image.data.data.url;
    }
    const onSubmit = async (data) => {
        const { submission_details, task_image } = data;

        try {
            // Upload image and prepare submission data
            const imageUrl = await handleImageUpload(task_image[0]);
            const addTaskData = {
                task_id: task?._id,
                task_title: task.task_title,
                task_image: imageUrl,
                payable_amount: task.payable_amount,
                worker_email: user?.email,
                submission_details: submission_details,
                worker_name: user?.displayName,
                buyer_name: task.buyer_name,
                buyer_email: task.buyer_email,
                date: new Date(),
                status: "pending",
            };

            // Submit the task
            const response = await axiosSecure.post("/submission-task", addTaskData);

            // Handle success response
            if (response.data.success) {
                const res = await axiosSecure.patch(`/decrease-required-workers/${task?._id}`);
                if (res.data.modifiedCount > 0) {
                    toast.success("Your task submitted successfully!");
                    navigate("/dashboard/tasklist");
                }
            }
        } catch (err) {
            // Handle error response
            if (err.response && err.response.data.message) {
                toast.error(err.response.data.message);
            } else {
                toast.error(err.message);
            }
        }
    };


    return (
        <div className="min-h-screen mt-10 max-w-screen-2xl">
            <div className=" flex justify-center items-center my-4 bg-gray-100 dark:bg-gray-700 w-full h-[350px]">
                <div className="max-w-screen-md space-y-2 text-gray-700 dark:text-white absolute">
                    <h3 className="md:text-7xl text-4xl uppercase font-bold">Job Details</h3>
                    <p className="text-center md:text-xl text-lg">
                        <Link className="hover:text-secondary font-medium" to="/">Home</Link> / Job Details
                    </p>
                </div>
            </div>
            <div className="py-20 max-w-screen-xl gap-6 mx-auto grid md:grid-cols-3 grid-cols-1">
                <div className='bg-gray-500 flex flex-col w-full justify-between text-white p-4  min-h-screen col-span-2'>
                    <h3 className='md:text-4xl text-3xl font-semibold '>{task.task_title}</h3>
                    <div>
                        <p className='text-2xl font-semibold'>Job Description :</p>
                        <p className='text-base font-bold my-3 italic'>{task.task_detail}</p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className=''>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg font-semibold dark:text-white">Enter The Required Proof Of Job Finished:</span>
                            </label>
                            <textarea {...register("submission_details", { required: true })} rows="6" className="py-3 border-2 rounded-none transition text-gray-700 outline-secondary shadow px-2"></textarea>
                            {errors.submission_details && <span className='text-secondary'>Task Detail field is required</span>}
                        </div>
                        <div className="form-control mt-4 text-black">
                            <input {...register("task_image", { required: true })} type="file" name="task_image" className="file-input file-input-bordered w-full rounded-none transition shadow" />
                            <p className=' text-white font-semibold mt-2'>Allowed File Extensions: {task.submission_info.join(',')}</p>
                            {errors.task_image && <span className='text-secondary'>Task image field is required</span>}
                        </div>
                        <div className="form-control mt-6">
                            <button type='submit' className="btn btn-primary text-white text-xl rounded-none">
                                {loading ? (
                                    setLoading(true)
                                ) : (
                                    'Request For Complete'
                                )}
                                {/* Request For Complete */}
                            </button>
                        </div>
                    </form>
                </div>
                <div className='min-h-screen p-4 w-full col-span-1  bg-gray-600 text-white'>
                    <h3 className='md:text-4xl text-3xl font-semibold '>Task Information</h3>
                    <div className='divider'></div>
                    <div className="card rounded-none bg-base-100">
                        <figure>
                            <img className='h-full w-full'
                                src={task.task_image}
                                alt="" />
                        </figure>
                        <div className="card-body text-center items-center text-gray-700">
                            <h2 className="card-title text-secondary">Job ID: {task._id}</h2>
                            <p className='font-semibold'>Buyer Name: <span className='text-secondary'>{task.buyer_name}</span></p>

                        </div>
                    </div>
                    <div className='bg-white flex justify-between items-center px-4 text-gray-700 w-full h-14 mt-4'>
                        <p className='text-3xl text-secondary border-r-2 pr-8 border-gray-400'><FaSackDollar /></p>
                        <div>
                            <p className='text-secondary text-lg font-bold'>{task.payable_amount} Coins</p>
                            <p className='text-gray-700 text-xs font-semibold'>You will Earn in this job</p>
                        </div>
                    </div>
                    <div className='bg-white flex justify-between items-center px-4 text-gray-700 w-full h-14 mt-4'>
                        <p className='text-3xl text-secondary border-r-2 pr-8 border-gray-400'><SlCalender /></p>
                        <div>
                            <p className='text-secondary text-lg font-bold'>{moment(task.completion_date).format('MMM Do YYYY')}</p>
                            <p className='text-gray-700 text-xs font-semibold'>Completion Date</p>
                        </div>
                    </div>
                    <div className='bg-white flex justify-between items-center px-4 text-gray-700 w-full h-14 mt-4'>
                        <p className='text-3xl text-secondary border-r-2 pr-8 border-gray-400'><FaUsers /></p>
                        <div>
                            <p className='text-secondary text-lg font-bold'>{task.required_workers}</p>
                            <p className='text-gray-700 text-xs font-semibold'>This Job Vacancy</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskDetails;