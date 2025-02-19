import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import goldCoin from '../../../assets/dollar-coin.png'
// Import Swiper styles
import 'swiper/css';
import img1 from '../../../assets/person1.jpg'
import img2 from '../../../assets/person2.jpg'
import img3 from '../../../assets/person3.jpg'
import img4 from '../../../assets/person4.jpg'
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import TestimonialHeading from '../../../components/TestimonialHeading';
const Testimonial = () => {

    return (
        <div className='max-w-screen-xl pt-20 mx-auto'>
            <div className='text-center mt-20 flex justify-center space-y-3 flex-col items-center'>
                <h3 className='md:text-4xl text-3xl text-center tracking-wider font-bold uppercase pt-10'>Testimonials</h3>
                <div className='w-24 h-2 rounded-lg bg-secondary'></div>
                <p className='text-gray-700 dark:text-white'>Here are our Satisfied customers feedback</p>
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
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination, Navigation]}
                className="mySwiper mt-20"
            >
                <SwiperSlide>
                   <TestimonialHeading img={img1} name="James Bond" quote={"This platform is a game-changer! I love how easy it is to earn extra money in my free time."}/>
                </SwiperSlide>
                <SwiperSlide>
                <TestimonialHeading img={img2} name="Parther jemmy" quote={"I’ve been able to work on my schedule and achieve financial freedom. Highly recommend it!"}/>
                </SwiperSlide>
                <SwiperSlide>
                <TestimonialHeading img={img3} name="Jenny jemmy" quote={"A great way to make money from home. The tasks are simple and rewarding!"}/>
                </SwiperSlide>
                <SwiperSlide>
                <TestimonialHeading img={img4} name="Alex joshim" quote={"Thanks to this site, I’ve found a flexible way to support my family without stress."}/>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Testimonial;
