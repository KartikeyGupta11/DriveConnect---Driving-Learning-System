# DriveConnect - Frontend

## Tech Stack
- **React.js** (v19)
- **Vite** (build tool)
- **Tailwind CSS** (utility-first CSS framework)
- **React Router DOM** (routing)
- **Axios** (API requests)
- **Framer Motion** (animations)
- **React Hot Toast** (notifications)
- **React Icons** (icon library)

## Main Pages
- **Login** (`/login`): User login with role-based redirect
- **Register** (`/register`): User registration (learner, instructor, admin)
- **Forgot Password** (`/forgot-password`): Request OTP for password reset
- **Verify OTP** (`/verify-otp`): OTP verification and password reset
- **Admin Dashboard** (`/admin`): View and manage instructor requests
- **Instructor Dashboard** (`/instructor`): Instructor home
- **Complete Profile** (`/instructor/complete-profile`): Instructor profile and vehicle info
- **Learner Dashboard** (`/learner`): Learner home
- **Courses** (`/learner/courses`): Driving courses, course progress, and course modals
- **Getting Started** (`/learner/getting-started`): Learner onboarding
- **Available Instructors**: List of instructors for learners

## Key Components
- **Login/Register/ForgotPassword/VerifyOTP**: Auth flows with form validation, video backgrounds, and toast notifications
- **AdminSidebar, LearnerSidebar**: Role-based navigation sidebars
- **InstructorRequests**: Admin view for pending instructor requests, modal for approval/rejection, file viewing
- **AvailableInstructors**: Learner view of all available instructors
- **CompleteProfile**: Multi-step instructor profile form with file uploads (profile pic, citizen ID, license, vehicle docs)
- **Courses**: Learner course dashboard, summary cards, course modals, and gallery
- **CourseCardModal, CourseGalleryModal**: Modals for viewing course details and all courses
- **FileViewer**: Utility for displaying and linking uploaded files

## Example Features
- **Role-based Routing**: Redirects users to dashboards based on their role after login
- **File Uploads**: Instructors upload profile, ID, license, and vehicle documents (PDF/image)
- **Admin Approval**: Admin can approve/reject instructor requests with reason
- **Course Progress**: Learners can view and continue their driving courses
- **Responsive UI**: Modern, mobile-friendly design with Tailwind CSS

## Getting Started
1. Navigate to the frontend app folder:
   ```powershell
   cd Frontend/car-learning-system
   ```
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Start the development server:
   ```powershell
   npm run dev
   ```

---

For more details, see the code in each page and component.
