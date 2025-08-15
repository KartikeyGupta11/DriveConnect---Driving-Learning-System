import { NavLink } from "react-router-dom";
import {
  FaYoutube,
  FaCalendarAlt,
  FaChartBar,
  FaTachometerAlt,
  FaCog,
  FaQuestionCircle,
} from "react-icons/fa";

const LearnerSidebar = () => {
  const links = [
    { path: "/learner", label: "Getting Started", icon: <FaTachometerAlt /> },
    // { path: "/learner/courses", label: "Courses", icon: <FaYoutube /> },
    { path: "/learner/bookings", label: "Bookings", icon: <FaCalendarAlt /> },
    // { path: "/learner/progress", label: "Progress", icon: <FaChartBar /> },
    { path: "/learner/settings", label: "Settings", icon: <FaCog /> },
    { path: "/learner/support", label: "Help & Support", icon: <FaQuestionCircle /> },
    // { path: "/learner/messages", label: "Messages", icon: <FaQuestionCircle /> },
  ];

  return (
    <aside className="w-64 bg-white h-screen shadow-lg fixed">
      <h1 className="text-2xl font-bold text-center py-6 border-b">DriveLearn</h1>
      <nav className="flex flex-col gap-3 mt-6 px-4">
        {links.map(({ path, label, icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              isActive
                ? "flex items-center gap-3 p-2 rounded-lg bg-green-200 text-green-800 font-semibold"
                : "flex items-center gap-3 p-2 rounded-lg text-gray-700 hover:bg-gray-100"
            }
          >
            {icon}
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default LearnerSidebar;
