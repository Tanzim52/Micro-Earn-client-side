import React from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateTask = () => {
    const task = useLoaderData();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const onSubmit = async(data) => {
        const res = await axiosSecure.patch(`/update-task/${task._id}`,data)
        if(res.data.modifiedCount > 0) {
            toast.success("Task updated successfully");
            navigate('/dashboard/all-tasks')
        }
    }
    return (
        <div className='max-w-screen-lg py-10 px-10 min-h-screen mx-auto shadow-md text-gray-800 dark:bg-gray-950 bg-neutral dark:text-white'>
            <h1 className='text-4xl text-center font-semibold uppercase pt-10'>Update tasks</h1>
            <form onSubmit={handleSubmit(onSubmit)} className=''>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text dark:text-white ">Task Title<span className='text-red-500 text-xl ml-1'>*</span></span>
                    </label>
                    <input defaultValue={task.task_title} type="text" {...register("task_title", { required: true })} name='task_title' placeholder="Task title" className=" py-3 border-2 rounded-none transition text-gray-700 outline-secondary shadow px-2" />
                    {errors.task_title && <span className='text-secondary'>Task title field is required</span>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text dark:text-white">Task Detail<span className='text-red-500 text-xl ml-1'>*</span></span>
                    </label>
                    <textarea defaultValue={task.task_detail} {...register("task_detail", { required: true })} rows="6" className="py-3 border-2 rounded-none transition text-gray-700 outline-secondary shadow px-2" placeholder="Task Detail"></textarea>
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
                            defaultChecked={task.submission_info.includes("png")}
                            id="png"
                            {...register("submission_info")}
                            className="checkbox rounded-none border-orange-400 [--chkbg:theme(colors.indigo.600)] [--chkfg:orange] checked:border-indigo-800"
                        />
                        <label className="form-check-label" htmlFor="jpg">JPG</label>
                        <input
                            type="checkbox"
                            value="jpg"
                            defaultChecked={task.submission_info.includes("jpg")}
                            id="jpg"
                            {...register("submission_info")}
                            className="checkbox rounded-none border-orange-400 [--chkbg:theme(colors.indigo.600)] [--chkfg:orange] checked:border-indigo-800"
                        />
                        <label className="form-check-label" htmlFor="jpeg">JPEG</label>
                        <input
                            type="checkbox"
                            value="jpeg"
                            defaultChecked={task.submission_info.includes("jpeg")}
                            id="jpeg"
                            {...register("submission_info")}
                            className="checkbox rounded-none border-orange-400 [--chkbg:theme(colors.indigo.600)] [--chkfg:orange] checked:border-indigo-800"
                        />
                    </div>
                </div>
                <div className="form-control mt-6">
                    <button type='submit' className="btn btn-primary text-white text-xl rounded-none">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateTask;