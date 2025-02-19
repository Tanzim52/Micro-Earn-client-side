import React from 'react';
import TaskCard from './TaskCard';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const AvailableTasks = () => {
    const {data:tasks} = useQuery({
        queryKey: ['tasks'],
        queryFn: async()=>{
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/all-available-task`)
            return res.data
        }
    })
    return (
        <div>
            <div className='text-center mt-20 flex justify-center space-y-3 flex-col items-center'>
                <h3 className='md:text-4xl text-3xl text-center tracking-wider font-bold uppercase pt-10'>Available Tasks</h3>
                <div className='w-24 h-2 rounded-lg bg-secondary'></div>
                <p className='text-gray-700 dark:text-white'>Here are the latest tasks that you can complete and earn money.</p>
            </div>
            <div className="py-20 max-w-screen-xl gap-6 mx-auto grid md:grid-cols-4 grid-cols-1">
                {
                    tasks?.map((task) =><TaskCard key={task._id} task={task} /> )
                }
                
            </div>
        </div>
    );
};

export default AvailableTasks;