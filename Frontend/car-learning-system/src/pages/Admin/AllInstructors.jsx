import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../../components/Sidebars/AdminSidebar";
import { FiPhone, FiMail } from "react-icons/fi";

const AllInstructors = () => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const IMAGE_BASE_URL = `${import.meta.env.VITE_IMAGE_URL}/uploads/`;

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/instructors`);
        setInstructors(res.data);
      } catch (error) {
        console.error("Error fetching instructors:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInstructors();
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          All Instructors
        </h1>

        {loading ? (
          <p className="text-center text-lg text-gray-600">Loading instructors...</p>
        ) : instructors.length === 0 ? (
          <p className="text-center text-gray-600">No instructors found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {instructors.map((instructor) => (
              <div
                key={instructor._id}
                className="bg-white shadow-md rounded-2xl p-4 gap-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onClick={() => setSelectedInstructor(instructor)}
              >
                <div className="flex items-center gap-4 border border-black p-2 rounded-2xl shadow-sm">
                  <img
                    src={
                      instructor.profilePic
                        ? `${IMAGE_BASE_URL}${instructor.profilePic}`
                        : "https://via.placeholder.com/100"
                    }
                    alt={instructor.name}
                    className="w-16 h-16 rounded-full object-cover border border-black"
                  />
                  <div className="flex-1">
                    <p className="text-lg text-gray-900">
                      {instructor.firstName} {instructor.lastName}
                    </p>
                    <h2 className="text-sm text-gray-500">{instructor.email}</h2>
                  </div>
                  <div className="flex gap-3">
                    <a
                      href={`tel:${instructor.contactNumber || ""}`}
                      className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition"
                    >
                      <FiPhone className="text-gray-700" size={18} />
                    </a>
                    <a
                      href={`mailto:${instructor.email || ""}`}
                      className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition"
                    >
                      <FiMail className="text-gray-700" size={18} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal for Selected Instructor */}
        {selectedInstructor && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 overflow-y-auto animate-fadeIn"
            onClick={() => setSelectedInstructor(null)}
          >
            <div
              className="bg-white rounded-xl p-6 w-full max-w-lg shadow-lg my-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-center items-center space-x-4">
                <img
                  src={
                    selectedInstructor.profilePic
                      ? `${IMAGE_BASE_URL}${selectedInstructor.profilePic}`
                      : "https://via.placeholder.com/100"
                    }
                    alt={selectedInstructor.name}
                    className="w-15 h-15 rounded-full object-cover mb-4 border-2 border-black"
                />
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
                  {selectedInstructor.firstName} {selectedInstructor.lastName}
                </h2>
              </div>

              {/* Citizen ID */}
              {selectedInstructor.citizenIdImage ? (
                <div className="mb-4">
                  <h3 className="font-semibold">Citizen ID</h3>
                  {selectedInstructor.citizenIdImage.endsWith(".pdf") ? (
                    <a
                      href={`${IMAGE_BASE_URL}${selectedInstructor.citizenIdImage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      View Citizen ID (PDF)
                    </a>
                  ) : (
                    <img
                      src={`${IMAGE_BASE_URL}${selectedInstructor.citizenIdImage}`}
                      alt="Citizen ID"
                      className="w-full rounded-lg mt-2"
                    />
                  )}
                </div>
              ) : (
                <p className="text-gray-500">No citizen ID uploaded</p>
              )}

              {/* Driving License */}
              {selectedInstructor.drivingLicenseImage ? (
                <div className="mb-4">
                  <h3 className="font-semibold">Driving License</h3>
                  {selectedInstructor.drivingLicenseImage.endsWith(".pdf") ? (
                    <a
                      href={`${IMAGE_BASE_URL}${selectedInstructor.drivingLicenseImage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      View Driving License (PDF)
                    </a>
                  ) : (
                    <img
                      src={`${IMAGE_BASE_URL}${selectedInstructor.drivingLicenseImage}`}
                      alt="Driving License"
                      className="w-full rounded-lg mt-2"
                    />
                  )}
                </div>
              ) : (
                <p className="text-gray-500">No driving license uploaded</p>
              )}

              {/* Vehicle Details */}
              {selectedInstructor.vehicleName ? (
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Vehicle Details</h3>
                  <div className="bg-gray-50 border rounded-xl p-4">
                    {selectedInstructor.vehicleImage && (
                      <img
                        src={`${IMAGE_BASE_URL}${selectedInstructor.vehicleImage}`}
                        alt="Car"
                        className="w-full h-64 object-cover rounded-lg mb-3"
                      />
                    )}
                    <p className="text-gray-800">
                      <strong>Name:</strong> {selectedInstructor.vehicleName}
                    </p>
                    <p className="text-gray-800">
                      <strong>Number:</strong> {selectedInstructor.vehicleNumber}
                    </p>
                    {selectedInstructor.vehiclePaperwork && (
                      <div className="mt-4">
                        <h4 className="font-semibold mb-1">Vehicle Paperwork</h4>
                        {selectedInstructor.vehiclePaperwork.endsWith(".pdf") ? (
                          <a
                            href={`${IMAGE_BASE_URL}${selectedInstructor.vehiclePaperwork}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block bg-blue-500 text-white text-center py-2 rounded-lg hover:bg-blue-600 transition"
                          >
                            View Paperwork (PDF)
                          </a>
                        ) : (
                          <img
                            src={`${IMAGE_BASE_URL}${selectedInstructor.vehiclePaperwork}`}
                            alt="Paperwork"
                            className="w-full rounded-lg mt-2"
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">
                  This instructor doesn't have his/her own car.
                </p>
              )}

              {/* Close Button */}
              <button
                onClick={() => setSelectedInstructor(null)}
                className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllInstructors;
