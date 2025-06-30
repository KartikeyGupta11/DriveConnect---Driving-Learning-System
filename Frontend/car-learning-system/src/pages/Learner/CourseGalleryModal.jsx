import React from "react";
import CourseCardModal from "./CourseCardModal";
import { FaTimes } from "react-icons/fa";

export default function CourseGalleryModal({ courses, onClose, onCardClick, show }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex justify-center items-start pt-10 transition-all duration-300 overflow-auto">
      <div className="bg-white w-11/12 max-w-6xl rounded-lg shadow-lg p-6 relative animate-fadeIn">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-red-500">
          <FaTimes size={18} />
        </button>
        <h2 className="text-2xl font-semibold mb-4">All Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <div
              key={index}
              className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-md transition cursor-pointer"
              onClick={() => onCardClick(course)}
            >
              <img src={course.image} alt={course.title} className="rounded mb-3 h-32 w-full object-cover" />
              <p className="text-sm text-gray-500 uppercase">{course.category}</p>
              <h3 className="font-semibold">{course.title}</h3>
              <p className="text-sm text-gray-500">{course.lessons} Lessons • {course.hours} Hours</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
