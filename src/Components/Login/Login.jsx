import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import Lottie from "lottie-react";
import toast, { Toaster } from "react-hot-toast";
import animationData from "../../assets/login.json"; // Replace with your animation file
import "animate.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Simple validation
    if (!email || !password) {
      toast.error("Please fill out all fields!");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Invalid email format!");
      return;
    }

    // Send login request to server (example)
    toast.success("Login successful!");
  };

  const handleGoogleSignIn = () => {
    // Handle Google Sign-In logic
    toast.success("Google Sign-In successful!");
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-[#F1F7ED] px-4"
    >
      {/* Lottie Animation */}
      <div className="w-64 md:w-80 animate__animated animate__fadeInDown">
        <Lottie animationData={animationData} loop={true} />
      </div>

      <h1 className="text-3xl font-bold text-[#243E36] mb-6 animate__animated animate__fadeInUp">
        Welcome Back to µ_Earn
      </h1>

      {/* Login Form */}
      <form
        onSubmit={handleLogin}
        className="bg-[#243E36] p-6 rounded-lg shadow-lg w-full max-w-md animate__animated animate__fadeInUp"
      >
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-[#F1F7ED] font-medium mb-2"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#F1F7ED] text-[#243E36] outline-none focus:ring-2 focus:ring-[#7CA982]"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-[#F1F7ED] font-medium mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#F1F7ED] text-[#243E36] outline-none focus:ring-2 focus:ring-[#7CA982]"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#7CA982] text-[#243E36] py-3 rounded-lg font-semibold hover:bg-[#243E36] hover:text-[#F1F7ED] transition-all"
        >
          Login
        </button>
      </form>

      <div className="mt-6 w-full max-w-md animate__animated animate__fadeInUp">
        <button
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center w-full bg-[#F1F7ED] text-[#243E36] py-3 rounded-lg font-semibold hover:bg-[#7CA982] hover:text-[#F1F7ED] transition-all"
        >
          <FaGoogle className="mr-2 text-xl" /> Sign In with Google
        </button>
      </div>

      <p className="mt-6 text-[#243E36] text-sm animate__animated animate__fadeInUp">
        Don't have an account?{" "}
        <a
          href="/register"
          className="text-[#7CA982] font-semibold hover:underline"
        >
          Register here
        </a>
      </p>

      {/* Toast Notifications */}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Login;
