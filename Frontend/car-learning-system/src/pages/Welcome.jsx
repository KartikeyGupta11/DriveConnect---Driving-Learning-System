import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#f0fdf4] to-[#d9f99d] px-6 py-12 font-sans">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#1F2937] leading-tight mb-6">
          Learn Driving with Confidence
        </h1>
        <p className="text-gray-700 text-lg md:text-xl mb-8">
          Welcome to our Driving Learning System — a platform where learners, instructors, and admins come together for seamless driving education.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <button
            onClick={() => navigate("/login")}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Get Started
          </button>

          <button
            onClick={() => navigate("/register")}
            className="bg-white border border-green-500 text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition"
          >
            Register Now
          </button>
        </div>

        <div className="mt-12 text-sm text-gray-600 max-w-xl mx-auto">
          <p className="mb-2">
            Whether you’re a <strong>learner</strong> starting your journey,
            an <strong>instructor</strong> managing sessions,
            or an <strong>admin</strong> overseeing the system — everything is organized in one place.
          </p>
          <p>
            Join us to make driving education accessible, structured, and efficient.
          </p>
        </div>
      </div>
    </div>
  );
}
