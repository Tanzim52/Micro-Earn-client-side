import React from "react";
import { Link } from "react-router-dom";
// import aboutImage from "../assets/about-us.png"; // Replace with an actual image path

const AboutUs = () => {
  return (
    <section id="about" className="bg-[#3D405B] text-white py-16 px-5 md:px-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left: Text Content */}
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-[#77FFEB]">
            About <span className="text-[#fffcf2]">μ-Earn</span>
          </h2>
          <p className="text-lg leading-relaxed">
            μ-Earn is a revolutionary platform that connects freelancers and clients in a seamless digital ecosystem. 
            Whether you're looking for skilled workers or want to monetize your expertise, μ-Earn provides a 
            secure, efficient, and rewarding experience.
          </p>
          <p className="text-lg leading-relaxed">
            Our mission is to empower individuals by providing flexible work opportunities and 
            creating a trustworthy digital marketplace.
          </p>
          <Link to='/features'>
            <button className="btn bg-[#77FFEB] hover:bg-[#60e6d5] text-black font-semibold px-6 py-3">
              Explore Features
            </button>
          </Link>
        </div>

        {/* Right: Image */}
        <div className="flex justify-center">
          <img 
            src='https://img.freepik.com/free-photo/colleagues-working-project-discussing-details_114579-2817.jpg?t=st=1740039485~exp=1740043085~hmac=d2529a3df39e35ed76edaf8485c0bc79bd85dec60d00345287ac12a722064855&w=1060' 
            alt="About μ-Earn" 
            className="w-full max-w-md rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
