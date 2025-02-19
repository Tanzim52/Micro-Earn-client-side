import React from 'react';

const SliderHeading = ({img,para="Get Started",title,subtitle}) => {
    return (
        <div>
            <img className="w-full relative" src={img} />
            <div className="absolute inset-0 bg-black/70"></div>
            <div className="absolute text-white md:top-60 top-32 space-y-3  left-1/2 -translate-x-1/2 -translate-y-1/2">
                <p className="text-secondary md:text-3xl text-xl font-semibold">{para}</p>
                <h3 className="md:text-5xl text-3xl font-bold">{title}</h3>
                <p className="md:text-lg text-xs">{subtitle}</p>
            </div>
        </div>
    );
};

export default SliderHeading;