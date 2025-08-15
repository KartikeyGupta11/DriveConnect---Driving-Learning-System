import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getToken, getUser } from "../../utils/authUtils";

const AvailableInstructors = () => {
  const [instructors, setInstructors] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const IMAGE_BASE_URL = `${import.meta.env.VITE_IMAGE_URL}/uploads/`;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/instructors`);
        setInstructors(res.data);
      } catch (error) {
        console.error("Error fetching instructors:", error);
      }
    };
    fetchInstructors();
  }, []);

  const handleCardClick = (instructor) => {
    setSelectedInstructor(instructor);
  };

  const handleBookClick = async() => {
    if(!selectedInstructor){
      return;
    }

    try {
      const token = getToken();
      // console.log(token);
      const user = getUser();

      if (!token || !user) {
        alert("Please login to book a class.");
        return;
      }

      const res = await axios.post(`${import.meta.env.VITE_API_URL}/bookings`, {
        instructorId: selectedInstructor._id,
        totalFee: selectedInstructor.fee
      },{
        headers: {
          Authorization: `${token}`,
        },
      });

      alert(res.data.message);
      setSelectedInstructor(null);
    } catch (error) {
      console.error("Booking error:", error);
      alert(error.response?.data?.message || "Failed to send booking request");
    }
  };
  
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Available Instructors</h2>

      {instructors.length === 0 ? (
        <p className="text-gray-500">No instructors available right now...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {instructors.map((instructor) => (
            <div
              key={instructor._id}
              onClick={() => handleCardClick(instructor)}
              className="cursor-pointer bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-5 flex items-center gap-4 border border-gray-200"
            >
              <img
                src={
                  instructor.profilePic
                    ? `${IMAGE_BASE_URL}/${instructor.profilePic}`
                    : "https://i.pravatar.cc/100"
                }
                alt={instructor.firstName + " " + instructor.lastName}
                className="w-16 h-16 rounded-full object-cover border-2 border-blue-400"
              />
              <div className="flex flex-col">
                <p className="font-semibold text-lg text-gray-800">
                  {instructor.firstName} {instructor.lastName}
                </p>
                <p className="text-sm text-gray-500">{instructor.email}</p>
                <span className="mt-1 inline-block bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full w-max">
                  Instructor
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL: Instructor Details */}
      {selectedInstructor && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 pt-10 transition-all duration-300 overflow-auto">
          <div className="bg-white w-11/12 max-w-lg rounded-lg shadow-lg p-6 relative animate-fadeIn transform animate-slideUp">
            <button
              onClick={() => setSelectedInstructor(null)}
              className="absolute top-2 right-3 text-gray-600 hover:text-red-500 text-lg"
            >
              &times;
            </button>

            <div className="flex flex-col items-center">
              <img
                src={
                  selectedInstructor.profilePic
                    ? `${IMAGE_BASE_URL}/${selectedInstructor.profilePic}`
                    : "https://i.pravatar.cc/100"
                }
                alt="Instructor"
                className="w-24 h-24 rounded-full object-cover border-2 border-blue-400 mb-3"
              />
              <h3 className="text-xl font-bold text-gray-800 mb-1">
                {selectedInstructor.firstName} {selectedInstructor.lastName}
              </h3>
              <p className="text-gray-500">{selectedInstructor.email}</p>

              {/* Hardcoded fields */}
              <p className="mt-2 text-gray-700">
                <span className="font-semibold">Driving Experience:</span> 5 years
              </p>
              <p className="mt-1 text-gray-700">
                <span className="font-semibold">Ratings:</span>{" "}
                {"⭐".repeat(3)} <span className="text-sm text-gray-500">(3500 points)</span>
              </p>

              <p className="text-gray-700 mt-2">
                <span className="font-semibold">Price:</span>{" "}
                ₹{selectedInstructor.price || "500"} / class
              </p>

              {/* Book Button */}
              <button
                onClick={handleBookClick}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Book Class
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvailableInstructors;
