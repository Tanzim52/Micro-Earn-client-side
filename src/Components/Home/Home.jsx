import React from "react";
import "animate.css";
import CountUp from "react-countup";
import { FaUsers, FaCoins, FaTasks } from "react-icons/fa";
import Banner from "../Banner/Banner";

const Home = () => {
  return (
    <div className=" bg-[#F1F7ED]">
      <div className="pb-10">
        <Banner></Banner>
      </div>
      <div className="bg-[#F1F7ED] text-[#243E36] px-4 md:px-10 py-10">
        {/* Section 1: About µ_Earn */}
        <section className="my-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold animate__animated animate__fadeInDown">
              Welcome to µ_Earn
            </h1>
            <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto animate__animated animate__fadeInUp">
              µ_Earn is a micro-task platform where workers earn coins by completing tasks while buyers post their needs and get them done efficiently. Start your journey today!
            </p>
          </div>
          <div className="mt-10 flex justify-center">
            <img
              src="https://img.freepik.com/premium-photo/top-view-start-up-team-brainstorming-their-project-white-table_67155-7429.jpg?w=1380"
              alt="About µ_Earn"
              className="w-full md:w-3/4 rounded-lg shadow-lg animate__animated animate__zoomIn"
            />
          </div>
        </section>

        {/* Section 2: Why Choose Us */}
        <section className="my-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center animate__animated animate__fadeInDown">
            Why Choose µ_Earn?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-2">
              <div className="flex justify-center">
                <img
                  src="https://img.freepik.com/free-vector/isometric-cryptocurrency-concept_23-2149149918.jpg?t=st=1737989008~exp=1737992608~hmac=336f57850ef113a35165bcb01610e557e87a9dcfb8b769f2189bd55ecaf85d30&w=740"
                  alt="Fast Payments"
                  className="w-20 h-20 mb-4 rounded-full"
                />
              </div>
              <h3 className="text-2xl font-semibold text-center">Fast Payments</h3>
              <p className="mt-2 text-center text-[#7CA982]">
                Earn coins and withdraw them instantly with our secure system.
              </p>
            </div>
            {/* Card 2 */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-2">
              <div className="flex justify-center">
                <img
                  src="https://img.freepik.com/premium-vector/customer-activation-icon-vector-image-can-be-used-digital-nomad_120816-85858.jpg?w=740"
                  alt="Verified Buyers"
                  className="w-20 h-20 mb-4 rounded-full"
                />
              </div>
              <h3 className="text-2xl font-semibold text-center">Verified Buyers</h3>
              <p className="mt-2 text-center text-[#7CA982]">
                Connect with trusted buyers and work on real-world tasks.
              </p>
            </div>
            {/* Card 3 */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-2">
              <div className="flex justify-center">
                <img
                  src="https://img.freepik.com/premium-photo/empowering-poc-entrepreneur-modern-smartphone-valuation-with-touch-blue_983420-83384.jpg?w=740"
                  alt="User Friendly"
                  className="w-20 h-20 mb-4 rounded-full"
                />
              </div>
              <h3 className="text-2xl font-semibold text-center">User Friendly</h3>
              <p className="mt-2 text-center text-[#7CA982]">
                Navigate easily with our simple and efficient platform.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Our Statistics */}
        <section className="my-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold animate__animated animate__fadeInDown">
            µ_Earn's Growing Numbers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            {/* Stat 1 */}
            <div className="flex flex-col items-center">
              <FaUsers className="text-6xl text-[#7CA982] mb-4 animate__animated animate__bounce" />
              <CountUp
                start={0}
                end={1000}
                duration={2.5}
                className="text-4xl font-bold"
              />
              <p className="text-lg">Happy Users</p>
            </div>
            {/* Stat 2 */}
            <div className="flex flex-col items-center">
              <FaCoins className="text-6xl text-[#7CA982] mb-4 animate__animated animate__swing" />
              <CountUp
                start={0}
                end={50000}
                duration={2.5}
                className="text-4xl font-bold"
              />
              <p className="text-lg">Coins Earned</p>
            </div>
            {/* Stat 3 */}
            <div className="flex flex-col items-center">
              <FaTasks className="text-6xl text-[#7CA982] mb-4 animate__animated animate__shakeX" />
              <CountUp
                start={0}
                end={1200}
                duration={2.5}
                className="text-4xl font-bold"
              />
              <p className="text-lg">Tasks Completed</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
