import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../../components/Sidebars/AdminSidebar";
import { getUser } from "../../utils/authUtils";

const FileViewer = ({ label, fileUrl }) => {
  const fullUrl = fileUrl?.startsWith("http")
    ? fileUrl
    : `${import.meta.env.VITE_API_URL}${fileUrl}`;

  return (
    <div>
      <p className="font-medium">{label}:</p>
      {fileUrl ? (
        <a
          href={fullUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 hover:underline"
        >
          View {label}
        </a>
      ) : (
        <p className="text-sm text-gray-500">Not provided</p>
      )}
    </div>
  );
};

const InstructorRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReq, setSelectedReq] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/pending-instructors`
      );
      setRequests(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching requests:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/approve-instructor/${id}`
      );
      fetchRequests();
      alert("Approved successfully");
    } catch (error) {
      console.error(error);
      alert("Approval failed");
    }
  };

  const handleReject = async (id) => {
    const reason = prompt("Enter rejection reason:");
    if (!reason) return;

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/reject-instructor/${id}`,
        { reason }
      );
      fetchRequests();
      alert("Rejected successfully");
    } catch (error) {
      console.error(error);
      alert("Rejection failed");
    }
  };

  const openModal = (req) => {
    setSelectedReq(req);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedReq(null);
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="ml-64 flex-1 p-6 bg-gray-100 min-h-screen">
        <h2 className="text-3xl font-semibold mb-6">Instructor Requests</h2>

        {loading ? (
          <p>Loading requests...</p>
        ) : requests.length === 0 ? (
          <p className="text-gray-500">No pending instructor requests.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {requests.map((req) => (
              <div
                key={req._id}
                className="bg-white p-4 rounded-xl shadow-md flex flex-col justify-between cursor-pointer hover:shadow-lg transition"
                onClick={() => openModal(req)}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={
                      req.profilePicUrl?.startsWith("http")
                        ? req.profilePicUrl
                        : `${import.meta.env.VITE_API_URL}${req.profilePicUrl}`
                    }
                    alt={req.userId?.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-lg font-medium">{req.userId?.name}</p>
                    <p className="text-sm text-gray-600">{req.userId?.email}</p>
                    <p className="text-sm text-gray-600">+91 {req.contactNumber}</p>
                  </div>
                </div>
                <span className="inline-block mt-3 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                  Status: {req.status}
                </span>
              </div>
            ))}
          </div>
        )}

        {isModalOpen && selectedReq && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300 overflow-auto">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6 relative">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                onClick={closeModal}
              >
                ×
              </button>
              <div className="flex gap-6">
                <img
                  src={
                    selectedReq.profilePicUrl?.startsWith("http")
                      ? selectedReq.profilePicUrl
                      : `${import.meta.env.VITE_API_URL}${selectedReq.profilePicUrl}`
                  }
                  alt="Instructor"
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-2xl font-semibold">
                    {selectedReq.userId?.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {selectedReq.userId?.email}
                  </p>
                  <p className="text-sm text-gray-600">
                    +91 {selectedReq.contactNumber}
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <FileViewer
                  label="Driving License"
                  fileUrl={selectedReq.licenseFileUrl}
                />
                <FileViewer
                  label="Citizen ID"
                  fileUrl={selectedReq.citizenIDFileUrl}
                />

                <div>
                  <h4 className="font-medium mb-2">Car Details</h4>
                  <p>
                    <strong>Number:</strong> {selectedReq.carNumber}
                  </p>
                  {selectedReq.carImageUrl && (
                    <img
                      src={
                        selectedReq.carImageUrl.startsWith("http")
                          ? selectedReq.carImageUrl
                          : `${import.meta.env.VITE_API_URL}${selectedReq.carImageUrl}`
                      }
                      alt="Car"
                      className="w-48 h-auto mt-2 rounded-md shadow"
                    />
                  )}
                  {selectedReq.carPaperworkUrl && (
                    <FileViewer
                      label="Car Paperwork"
                      fileUrl={selectedReq.carPaperworkUrl}
                    />
                  )}
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  onClick={() => {
                    handleReject(selectedReq._id);
                    closeModal();
                  }}
                >
                  Reject
                </button>
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  onClick={() => {
                    handleApprove(selectedReq._id);
                    closeModal();
                  }}
                >
                  Approve
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorRequests;
