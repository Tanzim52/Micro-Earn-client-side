import React, { useState } from "react";
import { FaUserCircle, FaEnvelope, FaLock, FaImage, FaUserTag } from "react-icons/fa";
import Lottie from "lottie-react";
import animationData from "../../assets/Animation - 1737983795946.json"; // Import your Lottie animation
import "animate.css";
import { auth } from "../../firebase.init"; // Import Firebase auth
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // For redirecting after registration

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        profilePic: "",
        password: "",
        role: "",
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate(); // Initialize useNavigate

    const validateInput = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required.";
        }

        if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            newErrors.email = "Invalid email format.";
        }

        if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters long.";
        }

        if (!formData.role) {
            newErrors.role = "Please select a role.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateInput()) {
          try {
            // Register user with Firebase
            const userCredential = await createUserWithEmailAndPassword(
              auth,
              formData.email,
              formData.password
            );
            const user = userCredential.user;
      
            console.log("User registered:", user);
      
            // Save additional user info to MongoDB
            const userInfo = {
              uid: user.uid, // Firebase UID
              name: formData.name,
              email: formData.email,
              profilePic: formData.profilePic,
              role: formData.role,
              coins: formData.role === "Worker" ? 10 : 50, // Assign coins based on role
            };
      
            // Send userInfo to your backend API
            const response = await fetch("http://localhost:5000/api/users", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userInfo),
            });
      
            if (response.ok) {
              console.log("User info saved to MongoDB");
              navigate("/login"); // Redirect to login page
            } else {
              console.error("Failed to save user info to MongoDB");
            }
          } catch (error) {
            console.error("Error registering user:", error.message);
            setErrors({ firebase: error.message }); // Display Firebase error to the user
          }
        }
      };

    return (
        <div className="bg-[#F1F7ED] min-h-screen flex flex-col md:flex-row items-start justify-center px-4">
            <div className="mx-auto md:mx-0">
                <Lottie animationData={animationData} className="sm:h-[200px] md:h-[400px]" loop={true} />
            </div>
            <div className="bg-[#F1F7ED] min-h-screen flex flex-col items-center justify-center px-4 mx-auto md:mx-0">
                <div className="animate__animated animate__fadeInDown w-full max-w-md bg-[#243E36] text-[#F1F7ED] rounded-2xl shadow-xl p-8">
                    <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>
                    <div className="w-40 mx-auto mb-6"></div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Name</label>
                            <div className="flex items-center bg-[#F1F7ED] rounded-md px-3 py-2">
                                <FaUserCircle className="text-[#243E36] mr-2" />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    className="bg-transparent w-full focus:outline-none"
                                />
                            </div>
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Email</label>
                            <div className="flex items-center bg-[#7CA982] rounded-md px-3 py-2">
                                <FaEnvelope className="text-[#243E36] mr-2" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    className="bg-transparent w-full focus:outline-none"
                                />
                            </div>
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Profile Picture URL</label>
                            <div className="flex items-center bg-[#7CA982] rounded-md px-3 py-2">
                                <FaImage className="text-[#243E36] mr-2" />
                                <input
                                    type="url"
                                    name="profilePic"
                                    value={formData.profilePic}
                                    onChange={handleChange}
                                    placeholder="Enter profile picture URL"
                                    className="bg-transparent w-full focus:outline-none"
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Password</label>
                            <div className="flex items-center bg-[#7CA982] rounded-md px-3 py-2">
                                <FaLock className="text-[#243E36] mr-2" />
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    className="bg-transparent w-full focus:outline-none"
                                />
                            </div>
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Role</label>
                            <div className="flex items-center bg-[#7CA982] rounded-md px-3 py-2">
                                <FaUserTag className="text-[#243E36] mr-2" />
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="bg-transparent w-full focus:outline-none"
                                >
                                    <option value="" disabled>
                                        Select your role
                                    </option>
                                    <option value="Worker">Worker</option>
                                    <option value="Buyer">Buyer</option>
                                </select>
                            </div>
                            {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
                        </div>

                        {errors.firebase && <p className="text-red-500 text-sm mb-4">{errors.firebase}</p>}

                        <button
                            type="submit"
                            className="w-full bg-[#7CA982] text-[#243E36] font-bold py-2 px-4 rounded-md hover:bg-[#5e8e72] transition"
                        >
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;