# DriveConnect - Driving Learning System

## Description

DriveConnect is a comprehensive platform designed to facilitate driving learning and management. It provides features for users to book driving lessons, manage instructor profiles, handle bookings, and verify users through OTP. The system is divided into a robust backend and a modern frontend, ensuring a seamless experience for both learners and instructors.

## Tech Stack

- **Backend:** Node.js, Express.js, MongoDB
- **Frontend:** React.js (with Vite or Create React App), JavaScript, HTML, CSS
- **Other:** Nodemailer (for email/OTP), Multer (for file uploads)

## Folder Structure

```
DriveConnect - Driving Learning System/
│
├── Backend/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── package.json
│   ├── Readme.md
│   └── server.js
│
├── Frontend/
│   └── car-learning-system/
│       ├── eslint.config.js
│       └── ...
│
├── Readme.md (this file)
```

- **Backend/**: Contains the server-side code, including API routes, controllers, models, configuration files, and uploads.
- **Frontend/**: Contains the client-side application for users and instructors.
- **Readme.md**: Project overview and folder structure.

---

For more details, refer to the individual `Readme.md` files inside the `Backend` and `Frontend` folders.

---

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running

### Backend Setup

1. Navigate to the `Backend` folder:
   ```powershell
   cd Backend
   ```
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Configure environment variables as needed (e.g., database URI, email credentials).
4. Start the backend server:
   ```powershell
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend app folder:
   ```powershell
   cd Frontend/car-learning-system
   ```
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Start the frontend development server:
   ```powershell
   npm start
   ```

---

## Author

**Kartikey Gupta**  
[LinkedIn](https://www.linkedin.com/in/kartikey-gupta-087b99236/)
