import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import TaskCard from '../../Home/AvailableTasks/TaskCard';

const Tasklist = () => {
    const { data: tasks } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/all-tasks`)
            return res.data
        }
    })
    return (
        <div>
            <h1 className='text-4xl text-center font-semibold uppercase pt-10'>Tasks List</h1>
            <div className="py-20 px-10 max-w-screen-xl gap-6 mx-auto grid md:grid-cols-3 grid-cols-1">
                {
                    tasks?.map((task) => <TaskCard key={task._id} task={task} />)
                }
            </div>
        </div>
    );
};

export default Tasklist;