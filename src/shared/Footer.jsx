
import { FaFacebook, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import React from "react";
import logo from "../assets/μ-Earn_fav_icon_with_no_background-removebg-preview.png";
import { SiBackendless } from "react-icons/si";
import { Link } from "react-router-dom";
// import logo from "../assets/1000094661-modified.png";
export default function Footer() {
  return (
    <div id="footer">
      <footer className="footer bg-[#3D405B] text-neutral-content p-10">
        <aside>

          <p className="flex flex-col md:flex-row items-start md:items-center gap-2">
            <div>
            <img src={logo} alt="logo" className="h-14 w-14" />
            </div>
            <div>
              <Link to='/'>
              <p className="font-bold text-xl">μ-Earn</p></Link>

              <p className="italic">Trust & Reliablity is always the priority.</p>
            </div>
          </p>
        </aside>
        <nav>
          <h6 className="font-bold text-2xl text-white">Socials</h6>
          <div className="flex text-xl gap-3 my-2">

            <a href="https://www.linkedin.com/in/tanzim52/" target="_blank" rel="noopener noreferrer"><FaLinkedinIn className="text-white  hover:text-lime-400" /></a>
            <a href="https://www.facebook.com/share/14knqDA7Gq/" target="_blank"><FaFacebook className="text-white hover:text-lime-400 "></FaFacebook></a>
            <a target="_blank" href="https://www.instagram.com/tanzim_52/profilecard/?igsh=ejZsZ3lma2twaXlj"><FaInstagram className="text-white hover:text-lime-400"></FaInstagram></a>
            <a href="https://github.com/Tanzim52" target="_blank" rel="noopener noreferrer"> <FaGithub className="text-white  hover:text-lime-400" /></a>

          </div>
        </nav>
      </footer>
      <footer className="footer footer-center bg-[#3D405B] text-white p-4">
        <aside>
          <p>Copyright © {new Date().getFullYear()} - All right reserved by MJ. Tanzim Development</p>
        </aside>
      </footer>
    </div>
  );
}
