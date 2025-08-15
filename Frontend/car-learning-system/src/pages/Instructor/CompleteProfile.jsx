import { useState, useEffect } from "react";
import axios from "axios";
import { getUser } from "../../utils/authUtils";

const CompleteProfile = () => {
  const steps = ["Personal Info", "Vehicle Info", "Available Slots Info"];
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [transitionClass, setTransitionClass] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contact: "",
    countryState: "",
    bio: "",
  });
  const [profilePic, setProfilePic] = useState(null);
  const [citizenIDFile, setCitizenIDFile] = useState(null);
  const [licenseFile, setLicenseFile] = useState(null);
  const [email, setEmail] = useState("");

  const [usePersonalVehicle, setUsePersonalVehicle] = useState(null);
  const [vehicleData, setVehicleData] = useState({
    vehicleName: "",
    vehicleType: "",
    vehicleNumber: ""
  });
  const [vehicleImage, setVehicleImage] = useState(null);
  const [vehiclePaperwork, setVehiclePaperwork] = useState(null);

  useEffect(() => {
    const userData = getUser();
    if (userData?.email) setEmail(userData.email);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setProfilePic(file);
  };

  const handleFileChange = (setter) => (e) => {
    const file = e.target.files[0];
    if (file?.type === "application/pdf") {
      setter(file);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVehicleChange = (e) => {
    const { name, value } = e.target;
    setVehicleData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVehicleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setVehicleImage(file);
  };

  const isFormComplete =
    formData.firstName.trim() &&
    formData.lastName.trim() &&
    formData.contact.trim() &&
    formData.countryState.trim() &&
    formData.bio.trim() &&
    profilePic &&
    citizenIDFile &&
    licenseFile;

  const slideToNext = () => {
    setTransitionClass("translate-x-full opacity-0");
    setTimeout(() => {
      setCurrentStepIndex((prev) => prev + 1);
      setTransitionClass("-translate-x-full opacity-0");
      setTimeout(() => {
        setTransitionClass("translate-x-0 opacity-100");
      }, 100);
    }, 300);
  };

  const slideToPrev = () => {
    setTransitionClass("-translate-x-full opacity-0");
    setTimeout(() => {
      setCurrentStepIndex((prev) => prev - 1);
      setTransitionClass("translate-x-full opacity-0");
      setTimeout(() => {
        setTransitionClass("translate-x-0 opacity-100");
      }, 100);
    }, 300);
  };

  const handleNext = () => {
    if (steps[currentStepIndex] === "Personal Info") {
      if (!isFormComplete) {
        alert("Please complete Personal Info first.");
        return;
      }
      const hasVehicle = confirm("Do you want to use your personal vehicle?");
      setUsePersonalVehicle(hasVehicle);
      if (hasVehicle) {
        slideToNext();
      } else {
        setCurrentStepIndex(steps.indexOf("Available Slots Info"));
      }
    } else {
      slideToNext();
    }
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      const user = getUser();
      data.append("userId", user._id);
      data.append("firstName", formData.firstName);
      data.append("lastName", formData.lastName);
      data.append("email", email);
      data.append("contactNumber", formData.contact);
      data.append("countryState", formData.countryState);
      data.append("bio", formData.bio);
      data.append("profilePic", profilePic);
      data.append("citizenIDFile", citizenIDFile);
      data.append("licenseFile", licenseFile);

      if (usePersonalVehicle) {
        data.append("vehicleName", vehicleData.vehicleName);
        data.append("vehicleType", vehicleData.vehicleType);
        data.append("vehicleNumber", vehicleData.vehicleNumber);
        data.append("vehicleImage", vehicleImage);
        data.append("vehiclePaperwork", vehiclePaperwork);
      }

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/instructors/create-request`,
        data
      );

      if (res.status === 201) {
        alert("Details submitted successfully. Please wait for admin approval.");
      } else {
        alert("Something went wrong. Try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Error submitting profile. Please check console.");
    }
  };

  const currentStep = steps[currentStepIndex];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <div className="w-full flex justify-center items-center p-6">
        <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-xl overflow-hidden relative">
          <h2 className="text-3xl font-semibold mb-4 text-center">Complete Profile</h2>
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {steps.map((step, idx) => (
              <span
                key={step}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  currentStepIndex === idx
                    ? "bg-indigo-100 text-indigo-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {step}
              </span>
            ))}
          </div>

          <div
            className={`transition-transform duration-300 ease-in-out transform ${transitionClass}`}
          >
            {currentStep === "Personal Info" && (
              <div className="space-y-4">
                <div className="flex items-center mb-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow">
                    <img
                      src={
                        profilePic
                          ? URL.createObjectURL(profilePic)
                          : "https://api.dicebear.com/6.x/thumbs/svg?seed=Instructor"
                      }
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <label className="cursor-pointer text-indigo-600 font-medium">
                      Change Photo
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </label>
                    <p className="text-xs text-gray-500">*.jpeg or .png (max 5MB)</p>
                  </div>
                </div>
                <div className="flex justify-between gap-3">
                  <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" className="w-1/2 border rounded-3xl px-3 py-2 text-sm" />
                  <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" className="w-1/2 border rounded-3xl px-3 py-2 text-sm" />
                </div>
                <input value={email} disabled className="w-full border rounded-3xl px-3 py-2 text-sm bg-gray-100" />
                <input name="contact" value={formData.contact} onChange={handleChange} placeholder="Contact Number" className="w-full border rounded-3xl px-3 py-2 text-sm" />
                <input name="countryState" value={formData.countryState} onChange={handleChange} placeholder="Country & State" className="w-full border rounded-3xl px-3 py-2 text-sm" />
                <textarea name="bio" rows={3} value={formData.bio} onChange={handleChange} placeholder="Bio" className="w-full border rounded-lg px-3 py-2 text-sm" />
                <label className="text-sm">Citizen ID Proof (PDF) *</label>
                <input type="file" accept="application/pdf" onChange={handleFileChange(setCitizenIDFile)} className="w-full text-sm text-gray-600 file:py-2 file:px-4 file:rounded file:border-0 file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200" />
                <label className="text-sm">Driving License (PDF) *</label>
                <input type="file" accept="application/pdf" onChange={handleFileChange(setLicenseFile)} className="w-full text-sm text-gray-600 file:py-2 file:px-4 file:rounded file:border-0 file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200" />
              </div>
            )}

            {currentStep === "Vehicle Info" && usePersonalVehicle && (
              <div className="space-y-4">
                <input name="vehicleName" value={vehicleData.vehicleName} onChange={handleVehicleChange} placeholder="Vehicle Name" className="w-full border rounded-3xl px-3 py-2 text-sm" />
                <select name="vehicleType" value={vehicleData.vehicleType} onChange={handleVehicleChange} className="w-full border rounded px-3 py-2 text-sm">
                  <option value="">Select Vehicle Type</option>
                  <option value="bike">Bike</option>
                  <option value="scooty">Scooty</option>
                  <option value="car">Car</option>
                </select>
                <input name="vehicleNumber" value={vehicleData.vehicleNumber} onChange={handleVehicleChange} placeholder="Vehicle Number" className="w-full border rounded-3xl px-3 py-2 text-sm" />
                <label className="text-sm">Vehicle Image (jpeg, png) *</label>
                <input type="file" accept="image/*" onChange={handleVehicleImageChange} className="w-full text-sm text-gray-600 file:py-2 file:px-4 file:rounded file:border-0 file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200" />
                <label className="text-sm">Vehicle Paperwork (PDF) *</label>
                <input type="file" accept="application/pdf" onChange={handleFileChange(setVehiclePaperwork)} className="w-full text-sm text-gray-600 file:py-2 file:px-4 file:rounded file:border-0 file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200" />
              </div>
            )}

            {currentStep === "Available Slots Info" && (
              <div>
                <p className="text-sm text-gray-600 mb-4">
                  ⚠️ Until you do not fill all the details, you might not be able to get a class.
                  
                </p>
                <div>
                  
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-between gap-2">
            {currentStepIndex > 0 && (
              <button
                onClick={slideToPrev}
                className="px-4 py-2 rounded-md text-sm text-gray-700 border"
              >
                Back
              </button>
            )}

            {currentStepIndex < steps.length - 1 ? (
              <button
                onClick={handleNext}
                className="px-4 py-2 rounded-md text-sm text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className={`px-4 py-2 rounded-md text-sm text-white ${
                  isFormComplete
                    ? "bg-indigo-600 hover:bg-indigo-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={!isFormComplete}
              >
                Submit Details
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfile;