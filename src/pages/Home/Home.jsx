import React from 'react';
import AvailableTasks from './AvailableTasks/AvailableTasks';
import Slider from './Carousel/Slider';
import BestWorkers from './BestWorker/BestWorkers';
import Testimonial from './Testimonial/Testimonial';
import Stats from './Stats/Stats';
import FindAndPostJob from './FindAndPostJob/FindAndPostJob';
import GetStarted from './GetStarted/GetStarted';
import AboutUs from './About/AboutUs';
import Features from './Features/Features';

const Home = () => {
    return (
        <div className=''>
            <Slider />
            {/* Best workers */}
            <div id='Best' ><BestWorkers/></div>
            <div id='Available'><AvailableTasks/></div>
            <div id='Testimonial'><Testimonial/></div>
            <div id='Stats'><Stats/></div>
            <div id='About'><AboutUs></AboutUs></div>
            <div id='Find'><FindAndPostJob/></div>
            <div id='Get Started'><GetStarted/></div>
            <div id='Features'><Features></Features></div>

        </div>
    );
};

export default Home;