import { useEffect, useState } from "react";
import axios from "axios";

const AvailableInstructors = () => {
  const [instructors, setInstructors] = useState([]);

  const dummyData = [
    {
      _id: 1,
      name: "Mr. Sharma",
      email: "s@gmail.com",
      profilePic: "https://i.pravatar.cc/100",
    },
    {
      _id: 2,
      name: "Ms. Neha",
      email: "n@gmail.com",
      profilePic: "https://i.pravatar.cc/101",
    },
  ];

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/instructors`);
        console.log("Response:",res.data);
        setInstructors(res.data);
      } catch (error) {
        console.error("Error fetching instructors:", error);
      }
    };

    fetchInstructors();
  }, []);


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
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-5 flex items-center gap-4 border border-gray-200"
            >
              <img
                src={instructor.profilePic || "https://i.pravatar.cc/100"}
                alt={instructor.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-blue-400"
              />
              <div className="flex flex-col">
                <p className="font-semibold text-lg text-gray-800">{instructor.name}</p>
                <p className="text-sm text-gray-500">{instructor.email}</p>

                <span className="mt-1 inline-block bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full w-max">
                    Instructor
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableInstructors;
