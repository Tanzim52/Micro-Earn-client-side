import React from 'react';
import AvailableTasks from './AvailableTasks/AvailableTasks';
import Slider from './Carousel/Slider';
import BestWorkers from './BestWorker/BestWorkers';
import Testimonial from './Testimonial/Testimonial';
import Stats from './Stats/Stats';
import FindAndPostJob from './FindAndPostJob/FindAndPostJob';
import GetStarted from './GetStarted/GetStarted';

const Home = () => {
    return (
        <div className=''>
            
            <Slider />
            {/* Best workers */}
            <BestWorkers/>
            <AvailableTasks/>
            <Testimonial/>
            <Stats/>
            <FindAndPostJob/>
            <GetStarted/>
        </div>
    );
};

export default Home;