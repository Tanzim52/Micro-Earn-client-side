import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import img1 from '../../../assets/img1.jpg'
import img2 from '../../../assets/img2.jpg'
import img3 from '../../../assets/img3.jpg'
import img4 from '../../../assets/img4.jpg'
import SliderHeading from "../../../components/sliderHeading";

const Slider = () => {
    return (
        <div className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] ">
            <Carousel 
                showThumbs={false} 
                showArrows={false} 
                autoPlay={true} 
                showStatus={false} 
                infiniteLoop={true} 
                interval={4000} 
                dynamicHeight={false}
            >
                {/* Slide 1 */}
                <div className="h-full flex items-center justify-center">
                    <SliderHeading 
                        img={img1} 
                        title="Find the Best Micro Jobs in Our Marketplace." 
                        subtitle="Using μ-Earn, You can earn money by completing micro jobs that start right away - Your one way to work from home and start earning" 
                    />
                </div>

                {/* Slide 2 */}
                <div className="h-full flex items-center justify-center">
                    <SliderHeading 
                        img={img2} 
                        title="Earn Money from Anywhere with Micro Tasks" 
                        subtitle="Join our marketplace to complete simple tasks, get paid instantly, and achieve financial freedom—your gateway to flexible work at home." 
                    />
                </div>

                {/* Slide 3 */}
                <div className="h-full flex items-center justify-center">
                    <SliderHeading 
                        img={img3} 
                        title="Turn Small Tasks into Big Rewards" 
                        subtitle="Complete quick jobs on your own schedule and get paid securely—start earning today with just a few clicks." 
                    />
                </div>

                {/* Slide 4 */}
                <div className="h-full flex items-center justify-center">
                    <SliderHeading 
                        img={img4} 
                        title="Work Smarter, Earn Faster" 
                        subtitle="From surveys to data entry, choose tasks that suit you and get paid instantly. Your hustle, your rules." 
                    />
                </div>
            </Carousel>
        </div>
    );
};

export default Slider;
