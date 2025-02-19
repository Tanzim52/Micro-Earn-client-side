import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import goldCoin from '../../../assets/dollar-coin.png'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
const BestWorkers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ["all-users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/best-worker");
            return res.data;
        },
    });
    return (
        <div className='max-w-screen-xl mx-auto'>
            <div className='text-center mt-20 flex justify-center space-y-3 flex-col items-center'>
                <h3 className='md:text-4xl text-3xl text-center tracking-wider font-bold uppercase pt-10'>Best Workers</h3>
                <div className='w-24 h-2 rounded-lg bg-secondary'></div>
                <p className='text-gray-700 dark:text-white'>Here are our best worker who earn the highest</p>
            </div>
            <Swiper
                breakpoints={{
                    0: {
                        slidesPerView: 1, // 1 slide for small screens
                    },
                    768: {
                        slidesPerView: 2, // 2 slides for medium screens (optional)
                    },
                    1024: {
                        slidesPerView: 3, // 3 slides for large screens
                    },
                }}
                spaceBetween={30}
                navigation={true}
                 modules={[Pagination, Navigation]}
                className="mySwiper mt-20"
            >
                {
                    users?.map(user => <SwiperSlide key={user._id}>
                        <div>
                            <img className="relative w-full h-[250px] object-cover" src={user.imageUrl} />
                            <div className="absolute top-4 right-2">
                                <button className="btn mr-2 btn-primary text-lg text-white"><img className='w-6 h-6' src={goldCoin} /><span>{user?.coins}</span></button>
                            </div>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export default BestWorkers;
