import { useEffect, useState } from "react";
import axios from "axios";
import LearnerSidebar from "../../components/Sidebars/LearnerSidebar";
import AvailableInstructors from "../Learner/AvailableInstructors";

const Bookings = () => {
  
  return (
    <div className="flex">
      <LearnerSidebar />
      <div className="ml-64 flex-1 p-6 bg-gray-100 min-h-screen">
        <h2 className="text-3xl font-semibold mb-6">Choose Your Mate...</h2>

        {/* ========== Available Instructors ========== */}

        <AvailableInstructors></AvailableInstructors>

      </div>
    </div>
  );
};

export default Bookings;
