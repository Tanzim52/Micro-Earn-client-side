import React from 'react';

const SliderHeading = ({ img, para = "Get Started", title, subtitle }) => {
    return (
        <div className="relative w-full h-full">
            {/* Background Image - Cover Entire Area */}
            <img className="w-full h-full object-cover" src={img} alt="Slider" />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Text Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
                <p className="text-secondary md:text-3xl text-xl font-semibold">{para}</p>
                <h3 className="md:text-5xl text-3xl font-bold">{title}</h3>
                <p className="md:text-lg text-xs">{subtitle}</p>
            </div>
        </div>
    );
};

export default SliderHeading;
