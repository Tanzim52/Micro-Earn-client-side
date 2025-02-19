import moment from 'moment';
import React from 'react';
import { IoIosPricetag } from 'react-icons/io';
import { Link } from 'react-router-dom';

const TaskCard = ({task}) => {
    const {task_image,required_workers,buyer_name,completion_date,payable_amount,task_title,_id} = task;
    return (
        <div className="card card-compact  bg-base-100 rounded-none shadow-xl">
            <figure>
                <img className="h-[200px] object-cover w-full" src={task_image} alt={task_title} />
            </figure>
            <div className="px-2 py-3 space-y-6 text-secondary">
                <div className='flex justify-between'>
                    <button className='btn text-secondary flex items-center uppercase gap-1 text-center text-xs font-semibold bg-gray-300 '><IoIosPricetag />vacancy available</button>
                    <button className='btn bg-gray-300 text-secondary font-bold '>{required_workers}</button>
                </div>
                <h4 className='text-gray-800 text-2xl font-semibold'>{task_title}</h4>
                <div className='flex items-center justify-between'>
                    <p className='text-gray-800 font-semibold'>Completion Date</p>
                    <p>{moment(completion_date).format('MMM Do YYYY')}</p>
                </div>
                <div className='flex items-center justify-between'>
                    <p className='text-gray-800 font-semibold'>Buyer Name</p>
                    <p>{buyer_name}</p>
                </div>
                <div className="flex justify-between items-center">
                    <p className='text-2xl font-bold'>{payable_amount} Coins</p>
                    <Link to={`/task-details/${_id}`} className="btn bg-primary hover:bg-primary text-white">View Details</Link>
                </div>
            </div>

        </div>
    );
};

export default TaskCard;