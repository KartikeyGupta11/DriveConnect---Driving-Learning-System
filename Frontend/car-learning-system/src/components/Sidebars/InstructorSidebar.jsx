import { NavLink } from "react-router-dom";
import {
  FaYoutube,
  FaCalendarAlt,
  FaChartBar,
  FaTachometerAlt,
  FaCog,
  FaQuestionCircle,
} from "react-icons/fa";

const InstructorSidebar = () => {
  const links = [
    { path: "/instructor", label: "Getting Started", icon: <FaTachometerAlt /> },
    { path: "/instructor/appointments", label: "Appointments", icon: <FaYoutube /> },
    { path: "/instructor/finances", label: "Bookings", icon: <FaCalendarAlt /> },
    { path: "/instructor/feedback", label: "Feedback", icon: <FaChartBar /> },
    { path: "/instructor/analytics", label: "Analytics", icon: <FaCog /> },
    { path: "/instructor/profile", label: "Profile", icon: <FaQuestionCircle /> },
    { path: "/instructor/help", label: "Help & Support", icon: <FaQuestionCircle /> },
    { path: "/instructor/settings", label: "Settings", icon: <FaQuestionCircle /> },
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

export default InstructorSidebar;
