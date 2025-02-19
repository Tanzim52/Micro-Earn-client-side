import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import axios from 'axios';
import useCoins from '../../../Hooks/useCoins';

const AddTasks = () => {
    const { user } = useAuth();
    const [coins,refetch] = useCoins(); 
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    const { data: userInfo, isLoading, } = useQuery({
        queryKey: ["userInfo", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            return res.data;
        }
    });
    const handleImageUpload = async (file) => {
        const formData = new FormData();
        formData.append("image", file);
        const task_image = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGEBB_API_KEY}`, formData);
        return task_image.data.data.url;
    }
    const onSubmit = async (data) => {
        const { required_workers, payable_amount, task_title, completion_date, submission_info, task_detail, task_image } = data;
        const totalPayable = parseInt(required_workers) * parseInt(payable_amount);
        if (totalPayable > userInfo?.coins) {
            toast.error("Not enough coins. Purchase more coins.")
            navigate('/purchase-coins');
            return;
        }
        try {
            const imageUrl = await handleImageUpload(task_image[0]);
            const addTaskData = {
                task_title: task_title,
                task_image: imageUrl,
                task_detail: task_detail,
                required_workers: parseInt(required_workers),
                completion_date: completion_date,
                submission_info: submission_info,
                payable_amount: parseInt(payable_amount),
                buyer_name: user?.displayName,
                buyer_email: user?.email,
                totalPayable: totalPayable

            }

            await axiosSecure.post("/add-tasks", addTaskData);
            const res = await axiosSecure.patch(`/users-coins/${user.email}`, {
                coins: -totalPayable,
            });
            if (res.data.modifiedCount > 0) {
                toast.success("Task added successfully!");
                refetch();
                navigate('/dashboard/all-tasks');
            }

        }
        catch (err) {
            toast.error("An error occurred while adding the task.");
        }
    };
    if (isLoading) {
        return <div className="loading loading-bars loading-lg"></div>;
    }
    const selectedSubmissionInfo = watch("submission_info") || [];
    return (
        <div className='max-w-screen-lg py-10 px-10 min-h-screen mx-auto shadow-md text-gray-800 dark:bg-gray-950 bg-neutral dark:text-white'>
            <h1 className='text-4xl text-center font-semibold uppercase pt-10'>add tasks</h1>
            <form onSubmit={handleSubmit(onSubmit)} className=''>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text dark:text-white ">Task Title<span className='text-red-500 text-xl ml-1'>*</span></span>
                    </label>
                    <input type="text" {...register("task_title", { required: true })} name='task_title' placeholder="Task title" className=" py-3 border-2 rounded-none transition text-gray-700 outline-secondary shadow px-2" />
                    {errors.task_title && <span className='text-secondary'>Task title field is required</span>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text dark:text-white ">Required workers(ex. 100)<span className='text-red-500 text-xl ml-1'>*</span></span>
                    </label>
                    <input type="number" {...register("required_workers", { required: true })} name='required_workers' placeholder="Required workers" className=" py-3 border-2 rounded-none transition text-gray-700 outline-secondary shadow px-2" />
                    {errors.required_workers && <span className='text-secondary'>Required workers field is required</span>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text dark:text-white">Payable Amount(ex. 10)<span className='text-red-500 text-xl ml-1'>*</span></span>
                    </label>
                    <input type="number" {...register("payable_amount", { required: true })} name='payable_amount' placeholder="Payable Amount" className=" py-3 border-2 rounded-none transition text-gray-700 outline-secondary shadow px-2" />
                    {errors.required_workers && <span className='text-secondary'>Payable Amount field is required</span>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text dark:text-white ">Completion Date<span className='text-red-500 text-xl ml-1'>*</span></span>
                    </label>
                    <input type="date" {...register("completion_date", { required: true })} name='completion_date' placeholder="Completion Date" className=" py-3 border-2 rounded-none transition text-gray-700 outline-secondary shadow px-2" />
                    {errors.completion_date && <span className='text-secondary'>Completion Date field is required</span>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text dark:text-white">Task Detail<span className='text-red-500 text-xl ml-1'>*</span></span>
                    </label>
                    <textarea {...register("task_detail", { required: true })} rows="6" className="py-3 border-2 rounded-none transition text-gray-700 outline-secondary shadow px-2" placeholder="Task Detail"></textarea>
                    {errors.task_detail && <span className='text-secondary'>Task Detail field is required</span>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text dark:text-white">Select File Upload Option
                            <span className="text-red-500 text-xl ml-1">*</span>
                        </span>
                    </label>
                    <div className="flex gap-2 items-center">
                        <label className="form-check-label" htmlFor="selectAll">Select All</label>
                        <input
                            type="checkbox"
                            id="selectAll"
                            className="checkbox rounded-none border-orange-400 [--chkbg:theme(colors.indigo.600)] [--chkfg:orange] checked:border-indigo-800"
                            onChange={(e) => {
                                const checkboxes = document.querySelectorAll("[name='submission_info']");
                                checkboxes.forEach((checkbox) => (checkbox.checked = e.target.checked));
                            }}
                        />
                    </div>
                    <div className="flex gap-2 items-center mt-2">
                        <label className="form-check-label" htmlFor="png">PNG</label>
                        <input
                            type="checkbox"
                            value="png"
                            id="png"
                            {...register("submission_info")}
                            className="checkbox rounded-none border-orange-400 [--chkbg:theme(colors.indigo.600)] [--chkfg:orange] checked:border-indigo-800"
                        />
                        <label className="form-check-label" htmlFor="jpg">JPG</label>
                        <input
                            type="checkbox"
                            value="jpg"
                            id="jpg"
                            {...register("submission_info")}
                            className="checkbox rounded-none border-orange-400 [--chkbg:theme(colors.indigo.600)] [--chkfg:orange] checked:border-indigo-800"
                        />
                        <label className="form-check-label" htmlFor="jpeg">JPEG</label>
                        <input
                            type="checkbox"
                            value="jpeg"
                            id="jpeg"
                            {...register("submission_info")}
                            className="checkbox rounded-none border-orange-400 [--chkbg:theme(colors.indigo.600)] [--chkfg:orange] checked:border-indigo-800"
                        />
                    </div>
                </div>
                <div className="form-control text-black">
                    <label className="label">
                        <span className="label-text dark:text-white">Task Image<span className='text-red-500 text-xl ml-1'>*</span></span>
                    </label>
                    <input {...register("task_image", { required: true })} type="file" name="task_image" className="file-input file-input-bordered w-full rounded-none transition shadow" />
                    {errors.task_image && <span className='text-secondary'>Task image field is required</span>}
                </div>
                <div className="form-control mt-6">
                    <button type='submit' className="btn btn-primary text-white text-xl rounded-none">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default AddTasks;