import React from 'react';
import { Link } from 'react-router-dom';

const GetStarted = () => {
    return (
        <div className='max-w-screen-lg shadow-xl  text-white rounded-xl p-10 bg-primary pt-20 min-h-[350px] gap-6 flex md:flex-row flex-col my-20 mx-auto'>
            <div className='flex-1 space-y-8'>
                <h2 className='md:text-5xl text-4xl font-bold'>Start Your Journey - Earn Now</h2>
                <p>Take few minutes to complete micro jobs anytime and anywere with no prior experience. Be stess-free and choose simple jobs in varius categories and start earning now with Picoworkers!</p>
            </div>
            <div className=" flex justify-center items-center">
                <Link to="/register" className='btn bg-secondary border-secondary hover:border-secondary hover:bg-secondary text-white'>Get Started Now</Link>
            </div>
        </div>
    );
};

export default GetStarted;