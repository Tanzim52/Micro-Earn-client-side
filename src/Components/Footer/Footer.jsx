import React from "react";
import { FaFacebookF, FaLinkedinIn, FaGithub, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#243E36] text-[#F1F7ED] py-6">
      <div className="container mx-auto flex flex-col items-center space-y-4">
        {/* Website Logo */}
        <Link to='/' className="text-2xl font-bold tracking-wide"><i>&micro;</i>_Earn</Link>

        {/* Social Media Icons */}
        <div className="flex space-x-6">
          <a
            href="https://linkedin.com/in/md-mahin-jawad-tanzim-18888b318/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#7CA982] hover:text-[#F1F7ED] transition-colors"
          >
            <FaLinkedinIn size={24} />
          </a>
          <a
            href="https://www.facebook.com/tanzim.mj?mibextid=ZbWKwL"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#7CA982] hover:text-[#F1F7ED] transition-colors"
          >
            <FaFacebookF size={24} />
          </a>
          <a
            href="https://github.com/Tanzim52"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#7CA982] hover:text-[#F1F7ED] transition-colors"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://www.instagram.com/tanzim_52/profilecard/?igsh=ejZsZ3lma2twaXlj"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#7CA982] hover:text-[#F1F7ED] transition-colors"
          >
            <FaInstagram size={24} />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-sm bg-emerald-800 px-11 py-3 rounded-md text-[#F1F7ED]">&copy; 2025 µ_Earn. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
