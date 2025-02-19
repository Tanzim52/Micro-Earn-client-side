import React from 'react';

const TestimonialHeading = ({img,name,quote}) => {
    return (
        <div>
        <img className="relative w-full h-[250px] object-cover" src={img} />
        <div className="absolute inset-0 bg-black/80"></div>
        <div className="absolute top-1/2 space-y-3  left-1/2 -translate-x-1/2 -translate-y-1/2">
           <p className='text-lg text-white font-bold'>__{name}</p>
           <p className='text-base text-white'><q>{quote}</q></p>
        </div>
    </div>
    );
};

export default TestimonialHeading;