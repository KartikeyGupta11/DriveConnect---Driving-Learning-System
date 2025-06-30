export default function CourseCardModal({ course, onClose }) {
  if (!course) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center backdrop-blur-sm bg-black/30 transition-opacity">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-lg transform scale-95 animate-fadeIn">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{course.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-red-500 text-xl font-bold"
          >
            ×
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-2">
          <span className="font-medium">Category:</span> {course.category}
        </p>
        <p className="text-sm text-gray-600 mb-2">
          <span className="font-medium">Lessons:</span> {course.lessons}
        </p>
        <p className="text-sm text-gray-600 mb-4">
          <span className="font-medium">Duration:</span> {course.hours} Hours
        </p>

        <a
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Watch on YouTube
        </a>
      </div>
    </div>
  );
}
