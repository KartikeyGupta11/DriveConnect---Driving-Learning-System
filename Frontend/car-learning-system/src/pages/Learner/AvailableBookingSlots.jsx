import { useState } from "react";
import { useNavigate } from "react-router-dom";

const dummySlots = [
  "Mon | 01 | July | 10:00 AM | 11:00 AM",
  "Mon | 01 | July | 11:30 AM | 12:30 PM",
  "Mon | 01 | July | 01:00 PM | 02:00 PM",
  "Tue | 02 | July | 09:00 AM | 10:00 AM",
  "Tue | 02 | July | 10:30 AM | 11:30 AM",
  "Tue | 02 | July | 12:00 PM | 01:00 PM",
  "Wed | 03 | July | 03:00 PM | 04:00 PM",
  "Wed | 03 | July | 04:30 PM | 05:30 PM",
  "Thu | 04 | July | 09:00 AM | 10:00 AM",
  "Fri | 05 | July | 11:00 AM | 12:00 PM",
];

const FEE_PER_CLASS = 500;

const AvailableBookingSlots = () => {
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [isFrozen, setIsFrozen] = useState(false);
  const navigate = useNavigate();

  const toggleSlotSelection = (slot) => {
    if (isFrozen) return;

    setSelectedSlots((prev) =>
      prev.includes(slot)
        ? prev.filter((s) => s !== slot)
        : [...prev, slot]
    );
  };

  const handleRequestViaChat = () => {
    const instructorId = "64c123..."; // Replace with selected instructor ID
    const learnerId = "64b456...";    // Replace with actual learner ID from auth context
    const learnerEmail = "learner@example.com";
    const learnerContact = "9876543210";
    const totalFee = selectedSlots.length * FEE_PER_CLASS;

    navigate("/learner/messages", {
      state: {
        instructorId,
        learnerId,
        learnerEmail,
        learnerContact,
        slots: selectedSlots,
        totalFee,
      },
    });
  };

  const totalFee = selectedSlots.length * FEE_PER_CLASS;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg p-6 transition-all duration-500">
        <h2 className="text-2xl font-semibold mb-4 text-center text-blue-700">
          Available Booking Slots
        </h2>

        <div className="max-h-[400px] overflow-y-auto scrollbar-thin pr-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {dummySlots.map((slot, index) => {
              const isSelected = selectedSlots.includes(slot);
              return (
                <div
                  key={index}
                  onClick={() => toggleSlotSelection(slot)}
                  className={`p-4 rounded-lg border text-sm cursor-pointer shadow-sm transition-all duration-300
                    ${
                      isFrozen && isSelected
                        ? "bg-green-100 border-green-500 text-green-700"
                        : isSelected
                        ? "bg-blue-600 text-white border-blue-700"
                        : "bg-gray-50 hover:bg-blue-100 border-gray-300"
                    }`}
                >
                  {slot}
                </div>
              );
            })}
          </div>
        </div>

        {/* Selection Summary & Button */}
        <div className="mt-6 text-center transition-all duration-500">
          <p className="mb-2 text-gray-700 font-medium">
            Selected Slots:{" "}
            <span className="text-blue-600 font-semibold">{selectedSlots.length}</span>
          </p>

          <p className="mb-4 text-black transition-all duration-300 text-lg font-medium">
            Have to Pay:{" "}
            <span className="text-green-600 font-bold text-xl">₹{totalFee}</span>
          </p>

          {selectedSlots.length > 0 && !isFrozen ? (
            <button
              onClick={handleRequestViaChat}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Request Booking
            </button>
          ) : (
            <button
              disabled
              className="px-6 py-2 bg-gray-400 text-white rounded cursor-not-allowed"
            >
              Request Booking
            </button>
          )}
        </div>

        {/* Confirmation Message if Needed */}
        {isFrozen && (
          <div className="mt-6 text-center transition-all duration-500">
            <p className="text-green-700 font-medium text-lg">
              Slots frozen and request sent to instructor!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailableBookingSlots;
