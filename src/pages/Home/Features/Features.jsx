import React from "react";
import { FaBriefcase, FaDollarSign, FaClock, FaUserShield, FaTasks, FaGlobe } from "react-icons/fa";

const featuresData = [
  {
    id: 1,
    icon: <FaBriefcase className="text-5xl text-[#77FFEB]" />,
    title: "Freelance Marketplace",
    description: "Connect with clients and freelancers worldwide to complete tasks efficiently.",
  },
  {
    id: 2,
    icon: <FaDollarSign className="text-5xl text-[#77FFEB]" />,
    title: "Instant Payments",
    description: "Receive secure payments instantly after completing your tasks successfully.",
  },
  {
    id: 3,
    icon: <FaClock className="text-5xl text-[#77FFEB]" />,
    title: "Work Anytime, Anywhere",
    description: "Choose flexible work schedules that fit your lifestyle and earn on your terms.",
  },
  {
    id: 4,
    icon: <FaUserShield className="text-5xl text-[#77FFEB]" />,
    title: "Secure Transactions",
    description: "We ensure secure transactions with robust encryption and fraud protection.",
  },
  {
    id: 5,
    icon: <FaTasks className="text-5xl text-[#77FFEB]" />,
    title: "Diverse Job Categories",
    description: "Find tasks across multiple categories, including writing, design, and data entry.",
  },
  {
    id: 6,
    icon: <FaGlobe className="text-5xl text-[#77FFEB]" />,
    title: "Global Reach",
    description: "Join a worldwide community of workers and clients to expand your opportunities.",
  },
];

const Features = () => {
  return (
    <section id="features" className="mx-9 mb-9 rounded-2xl bg-[#3D405B] text-white py-16 px-5 md:px-10">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-[#77FFEB] mb-6">
          Our <span className="text-[#fffcf2]">Features</span>
        </h2>
        <p className="text-lg text-gray-300 mb-12">
          Discover how μ-Earn makes freelancing easy, secure, and rewarding for everyone.
        </p>
      </div>

      {/* Features Grid */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {featuresData.map((feature) => (
          <div 
            key={feature.id} 
            className="p-6 bg-[#292B45] rounded-lg shadow-lg text-center flex flex-col items-center transition transform hover:scale-105"
          >
            {feature.icon}
            <h3 className="text-2xl font-semibold mt-4">{feature.title}</h3>
            <p className="text-gray-300 mt-2">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
