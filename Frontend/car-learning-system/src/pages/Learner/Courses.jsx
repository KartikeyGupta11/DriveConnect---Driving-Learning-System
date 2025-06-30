import { useState } from "react";
import LearnerSidebar from "../../components/Sidebars/LearnerSidebar";
import CourseCardModal from "../Learner/CourseCardModal";
import CourseGalleryModal from "../Learner/CourseGalleryModal";
import course1 from "../../assets/course1.png";
import course2 from "../../assets/course2.png";
import course3 from "../../assets/course3.png";

export default function Courses() {
  const [summary] = useState({
    ongoing: 3,
    complete: 5,
    certificates: 2,
    hours: 38,
  });

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showGallery, setShowGallery] = useState(false);

  const popularCourses = [
    {
      title: "How to Pass your Driving Tests",
      category: "Basics",
      lessons: 12,
      hours: 10,
      price: "Included",
      image: course1,
    },
    {
      title: "Traffic Rules & Signals",
      category: "Theory",
      lessons: 8,
      hours: 6,
      price: "Included",
      image: course3,
    },
    {
      title: "DMv Driving Test",
      category: "Practical",
      lessons: 10,
      hours: 6,
      price: "Included",
      image: course2,
    },
    {
      title: "Parallel Parking Mastery",
      category: "Practical",
      lessons: 10,
      hours: 6,
      price: "Included",
      image: course2,
    },
    {
      title: "City Driving Skills",
      category: "Practical",
      lessons: 10,
      hours: 6,
      price: "Included",
      image: course2,
    },
    {
      title: "Emergency Situations",
      category: "Practical",
      lessons: 10,
      hours: 6,
      price: "Included",
      image: course2,
    },
  ];

  const myCourses = [
    { name: "Driving Basics", lessons: "12/12", status: "Complete", level: "Beginner", category: "Basics" },
    { name: "Traffic Rules", lessons: "5/8", status: "Ongoing", level: "Intermediate", category: "Theory" },
    { name: "Parking Techniques", lessons: "2/5", status: "Ongoing", level: "Advanced", category: "Practical" },
  ];

  const continueLearning = [
    { name: "Traffic Rules", category: "Theory", progress: 62, lessons: "5/8" },
    { name: "Parking Techniques", category: "Practical", progress: 40, lessons: "2/5" },
    { name: "Highway Safety Tips", category: "Advanced", progress: 0, lessons: "0/6" },
  ];

  return (
    <div className="flex">
      <LearnerSidebar />
      <div className="ml-64 w-full p-8 min-h-screen bg-gray-50">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            { label: "Ongoing Courses", value: summary.ongoing },
            { label: "Completed Courses", value: summary.complete },
            { label: "Certificates Earned", value: summary.certificates },
            { label: "Hours Spent", value: summary.hours },
          ].map(({ label, value }, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow text-center">
              <p className="text-3xl font-bold text-indigo-600">{value}</p>
              <p className="text-sm text-gray-500">{label}</p>
            </div>
          ))}
        </div>

        {/* Course Topic Overview */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-2">Course Topics</h3>
            <div className="w-full flex justify-center">
              <div className="w-40 h-40 rounded-full border-[27px] border-purple-400 border-t-purple-600 flex items-center justify-center text-xl font-bold">
                10
              </div>
            </div>
            <ul className="mt-4 text-sm text-gray-600 space-y-1">
              <li><span className="text-purple-600 font-medium">Basics</span> (30%)</li>
              <li><span className="text-indigo-600 font-medium">Theory</span> (25%)</li>
              <li><span className="text-pink-600 font-medium">Practical</span> (35%)</li>
              <li><span className="text-yellow-500 font-medium">Advanced</span> (10%)</li>
            </ul>
          </div>

          {/* Popular Driving Courses */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              Popular Driving Courses
              <button
                onClick={() => setShowGallery(true)}
                className="text-gray-500 hover:text-indigo-600 transition"
                title="View All"
              >
                ➔
              </button>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {popularCourses.slice(0, 3).map((course, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow cursor-pointer hover:shadow-lg transition"
                  onClick={() => setSelectedCourse(course)}
                >
                  <img src={course.image} alt={course.title} className="rounded mb-3 h-32 w-full object-cover" />
                  <p className="text-sm text-gray-500 uppercase">{course.category}</p>
                  <h3 className="font-semibold">{course.title}</h3>
                  <p className="text-sm text-gray-500">{course.lessons} Lessons • {course.hours} Hours</p>
                  <p className="font-semibold mt-1">{course.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* My Course Table */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-3">My Driving Courses</h2>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="p-3 text-left">Course Name</th>
                  <th className="p-3">Lessons</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Level</th>
                  <th className="p-3">Category</th>
                </tr>
              </thead>
              <tbody>
                {myCourses.map((course, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="p-3">{course.name}</td>
                    <td className="p-3 text-center">{course.lessons}</td>
                    <td className={`p-3 text-center font-medium ${course.status === "Complete" ? "text-green-500" : "text-yellow-500"}`}>{course.status}</td>
                    <td className="p-3 text-center">{course.level}</td>
                    <td className="p-3 text-center">{course.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Continue Learning */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-3">Continue Learning</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {continueLearning.map((course, i) => (
              <div key={i} className="bg-white p-4 rounded-lg shadow">
                <p className="text-sm text-gray-500 uppercase">{course.category}</p>
                <h4 className="font-semibold">{course.name}</h4>
                <p className="text-xs text-gray-500 mb-2">{course.lessons} Lessons</p>
                <div className="w-full bg-gray-200 h-2 rounded">
                  <div className="bg-green-500 h-2 rounded" style={{ width: `${course.progress}%` }}></div>
                </div>
                <p className="text-right text-xs text-gray-600 mt-1">{course.progress}% completed</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      <CourseCardModal
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
      />

      <CourseGalleryModal
        courses={popularCourses}
        show={showGallery}
        onClose={() => setShowGallery(false)}
        onCardClick={(course) => {
          setSelectedCourse(course);
          setShowGallery(false);
        }}
      />
    </div>
  );
}
