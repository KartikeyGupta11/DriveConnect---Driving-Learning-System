import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOTP from "./pages/VerifyOTP";
import AdminDashboard from "./pages/AdminDashboard";
import InstructorDashboard from "./pages/InstructorDashboard";
import Manager from "./pages/Admin/Manager";
import AllInstructors from "./pages/Admin/AllInstructors";

// Learner Pages
import GettingStarted from "./pages/Learner/GettingStarted";
import Courses from "./pages/Learner/Courses";
import Bookings from "./pages/Learner/Bookings";
import AvailableBookingSlots from "./pages/Learner/AvailableBookingSlots";
// import Progress from "./pages/Learner/Progress";
// You can import more like Tests, History, Certificates, etc. here

import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import "./index.css";

// Instructor Pages
import CompleteProfile from "./pages/Instructor/CompleteProfile";


function AppWrapper() {
  const location = useLocation();

  // Hide navbar for certain auth and dashboard pages
  const hideNavbarRoutes = [
    "/", "/login", "/register", "/forgot-password", "/verify-otp",
    "/learner", "/learner/courses", "/learner/bookings", "/learner/progress",
    "/instructor", "/admin","/instructor/complete-profile","/admin/manager","/learner/available-slots","/admin/instructorList",
  ];

  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="w-full min-h-screen bg-black">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      {shouldShowNavbar && <Navbar />}
      
      <Routes>
        {/* Public & Auth Routes */}
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />

        {/* Learner Routes */}
        <Route path="/learner" element={<GettingStarted />} />
        <Route path="/learner/courses" element={<Courses />} />
        <Route path="/learner/bookings" element={<Bookings />} />
        <Route path="/learner/available-slots" element={<AvailableBookingSlots/>}/>
        {/* <Route path="/learner/progress" element={<Progress />} /> */}
        {/* Add more learner routes like tests, profile, etc. */}


        {/* Instructor Routes */}
        <Route path="/instructor" element={<InstructorDashboard />} />
        <Route path="/instructor/complete-profile" element={<CompleteProfile/>} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/manager" element={<Manager/>} />
        <Route path="/admin/instructorList" element={<AllInstructors/>}/>
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
