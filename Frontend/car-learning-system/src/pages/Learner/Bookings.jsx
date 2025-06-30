import { useEffect, useState } from "react";
import axios from "axios";
import LearnerSidebar from "../../components/Sidebars/LearnerSidebar";
import AvailableInstructors from "../Instructor/AvailableInstructors";

const dummyBookings = [
  {
    id: 1,
    date: "2025-07-01",
    time: "10:00 AM",
    instructor: "Mr. Sharma",
    status: "Upcoming",
  },
  {
    id: 2,
    date: "2025-06-15",
    time: "02:00 PM",
    instructor: "Ms. Neha",
    status: "Completed",
  },
];

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    setBookings(dummyBookings);
  }, []);

//   console.log(dummyBookings);/

  return (
    <div className="flex">
      <LearnerSidebar />
      <div className="ml-64 flex-1 p-6 bg-gray-100 min-h-screen">
        <h2 className="text-3xl font-semibold mb-6">My Bookings</h2>

        {/* ========== Upcoming Bookings ========== */}
        {bookings.some(b => b.status === "Upcoming") && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Upcoming Booking</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {bookings
                .filter(b => b.status === "Upcoming")
                .map(b => (
                  <div
                    key={b.id}
                    className="bg-white p-4 rounded-xl shadow-md flex flex-col justify-between"
                  >
                    <div>
                      <p className="text-lg font-medium mb-1">Date: {b.date}</p>
                      <p>Time: {b.time}</p>
                      <p>Instructor: {b.instructor}</p>
                      <span className="inline-block mt-2 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                        {b.status}
                      </span>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600 text-sm">
                        Reschedule
                      </button>
                      <button className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 text-sm">
                        Cancel
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ========== Booking History ========== */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-4">Booking History</h3>
          <div className="overflow-x-auto bg-white shadow-md rounded-xl">
            <table className="w-full text-left">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="p-3">Date</th>
                  <th className="p-3">Time</th>
                  <th className="p-3">Instructor</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id} className="border-b">
                    <td className="p-3">{b.date}</td>
                    <td className="p-3">{b.time}</td>
                    <td className="p-3">{b.instructor}</td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          b.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : b.status === "Upcoming"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <button className="text-blue-500 hover:underline text-sm">View</button>
                    </td>
                  </tr>
                ))}
                {bookings.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-500">
                      No bookings found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ========== Available Instructors ========== */}

        <AvailableInstructors></AvailableInstructors>

      </div>
    </div>
  );
};

export default Bookings;
