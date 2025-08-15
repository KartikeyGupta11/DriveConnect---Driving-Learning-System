// pages/InstructorDashboard.jsx
import AdminSidebar from '../components/Sidebars/AdminSidebar';

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 bg-gray-50"> {/* your main content */}</div>
    </div>
  );
};

export default AdminDashboard;
