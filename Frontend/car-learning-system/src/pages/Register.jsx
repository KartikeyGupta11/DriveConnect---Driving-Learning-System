import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { saveAuthData, clearAuthData } from "../utils/authUtils"; 


export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "learner",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Registration failed");
        return;
      }

      clearAuthData();

      saveAuthData(data.token, data.user);

      toast.success(data.message || "Registered successfully!");

      console.log(res);
      data.user?.role === "instructor" ? navigate("/instructor/complete-profile") : (navigate("/login"))
 
    } catch (err) {
      console.error("Registration error:", err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans">
      {/* Left Section - MP4 Video */}
      <div className="hidden md:flex w-full md:w-1/2 items-center justify-center bg-black p-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover rounded-r-none rounded-l-lg"
        >
          <source src="/Registeration.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Right Section - Register Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-10 bg-white">
        <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-white border border-gray-200">
          <div className="flex flex-col items-center mb-6">
            <div className="text-green-600 text-4xl font-extrabold mb-2">D</div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Create your account
            </h2>
            <p className="text-gray-500 text-sm text-center">
              Join us and start your driving learning journey today.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create Password"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="learner">Learner</option>
              <option value="instructor">Instructor</option>
              <option value="admin">Admin</option>
            </select>

            <button
              type="submit"
              className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition"
            >
              Register
            </button>
          </form>

          <div className="my-6 flex items-center justify-center">
            <button
              type="button"
              className="flex items-center bg-white border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded-lg shadow-sm text-sm"
            >
              <FaGoogle className="mr-2 text-green-600" /> Register with Google
            </button>
          </div>

          <p className="text-sm text-center text-gray-500">
            Already have an account?{" "}
            <a href="/login" className="text-green-600 font-medium hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
