import React from "react";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";

const Banner = () => {
  return (
    <AwesomeSlider className="w-full h-[80vh]">
      {/* Slide 1 */}
      <div
        className="relative w-full h-full flex flex-col items-center justify-center text-center text-[#F1F7ED]"
        style={{
          backgroundImage: "url('https://img.freepik.com/premium-photo/3d-rendering-whatsapp-icon-laptop-screen_351527-301.jpg?w=1380')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-[#243E36]/60 w-full h-full absolute top-0 left-0"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to µ_Earn</h1>
          <p className="text-lg md:text-2xl">
            A place where tasks turn into opportunities.
          </p>
        </div>
      </div>

      {/* Slide 2 */}
      <div
        className="relative w-full h-full flex flex-col items-center justify-center text-center text-[#F1F7ED]"
        style={{
          backgroundImage: "url('https://img.freepik.com/free-photo/indoor-shot-enthusiastic-excited-happy-daring-girl-with-combed-hair-tattoo-cute-diasdema_1258-232091.jpg?t=st=1737987200~exp=1737990800~hmac=2df336cb6681f7f20d2746001993e65f033e93810a949504180baafb72ec45b9&w=1380')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-[#243E36]/60 w-full h-full absolute top-0 left-0"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Earn Coins Effortlessly</h1>
          <p className="text-lg md:text-2xl">
            Start earning as a Worker or empower others as a Buyer.
          </p>
        </div>
      </div>

      {/* Slide 3 */}
      <div
        className="relative w-full h-full flex flex-col items-center justify-center text-center text-[#243E36]"
        style={{
          backgroundImage: "url('https://img.freepik.com/premium-photo/text-sign-showing-business-success-words-with-concept-idea_352439-1509.jpg?w=1380')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-[#F1F7ED]/70 w-full h-full absolute top-0 left-0"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Join Us Today</h1>
          <p className="text-lg md:text-2xl">
            Create your account and begin your journey now!
          </p>
        </div>
      </div>
    </AwesomeSlider>
  );
};

export default Banner;
