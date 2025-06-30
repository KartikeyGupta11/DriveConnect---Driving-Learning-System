import LearnerSidebar from "../../components/Sidebars/LearnerSidebar";
import { useState, useEffect } from "react";
import { getUser } from "../../utils/authUtils";
import { useNavigate } from "react-router-dom";

export default function GettingStarted() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = getUser();
    setUser(userData);
  }, []);

  return (
    <div className="flex">
      <LearnerSidebar />

      <main className="ml-64 w-full p-8 min-h-screen bg-gray-50">
        {/* Header */}
        <h1 className="text-3xl font-bold mb-2 text-gray-800">
          Getting Started, {user?.name || "Learner"} 👋
        </h1>
        <p className="text-gray-600 mb-6 capitalize">
          You're logged in as: <span className="font-semibold">{user?.role}</span>
        </p>

        {/* Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-lg font-semibold mb-1">Upcoming Booking</h2>
            <p className="text-sm text-gray-600">Next session: 26th June, 4:00 PM</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-lg font-semibold mb-2">Course Progress</h2>
            <div className="h-3 w-full bg-gray-200 rounded-full mt-2 mb-1">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: "0%" }}></div>
            </div>
            <p className="text-sm text-gray-600">Driving Basics - 0% completed</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-lg font-semibold mb-1">Today's Tip</h2>
            <p className="text-sm text-gray-600">
              Use both hands on the wheel for better control and safety.
            </p>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-purple-100 border-l-4 border-purple-600 rounded-xl p-5">
            <h3 className="text-purple-800 font-semibold mb-1">Want to Learn More?</h3>
            <p className="text-sm text-purple-700">
              Continue your lesson now to unlock your next driving module.
            </p>
          </div>

          <div className="bg-yellow-100 border-l-4 border-yellow-500 rounded-xl p-5">
            <h3 className="text-yellow-800 font-semibold mb-1">Don't Miss Your Class!</h3>
            <p className="text-sm text-yellow-700">
              Your instructor will be waiting at the scheduled time tomorrow.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-6 mb-8">
          <button
            onClick={() => navigate("/learner/bookings")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg"
          >
            Book Instructor
          </button>
          <button
            onClick={() => navigate("/learner/courses")}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg"
          >
            Start Learning
          </button>
        </div>

        {/* Upcoming Sessions Table */}
        <div className="bg-white rounded-xl p-6 shadow-md mb-8">
          <h2 className="text-lg font-semibold mb-2">Upcoming Sessions</h2>
          <table className="w-full text-sm text-gray-700">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">Date</th>
                <th className="py-2">Time</th>
                <th className="py-2">Instructor</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">June 27</td>
                <td className="py-2">3:00 PM</td>
                <td className="py-2">Mr. Sharma</td>
              </tr>
              <tr>
                <td className="py-2">June 30</td>
                <td className="py-2">11:00 AM</td>
                <td className="py-2">Ms. Roy</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Reminders */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-lg font-semibold mb-2">Reminders</h2>
          <ul className="list-disc ml-6 text-gray-700 text-sm space-y-1">
            <li>Your license test is in 5 days.</li>
            <li>Watch your next driving lesson to stay on track.</li>
            <li>Confirm tomorrow’s booking with your instructor.</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
