import { useState, useEffect } from "react";
import axios from "axios";
import { getUser } from "../../utils/authUtils";

const CompleteProfile = () => {
  const steps = [
    "Personal Info",
    "Vehicle Info"
  ];

  const [selectedStep, setSelectedStep] = useState("Personal Info");
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
        "http://localhost:5000/api/instructors/create-request",
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

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <div className="w-full flex justify-center items-center p-6">
        <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-xl">
          <h2 className="text-3xl font-semibold mb-4 text-center">Complete Profile</h2>

          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {steps.map((step) => (
              <button
                key={step}
                onClick={() => setSelectedStep(step)}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedStep === step
                    ? "bg-indigo-100 text-indigo-700"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {step}
              </button>
            ))}
          </div>

          {selectedStep === "Personal Info" && (
            <>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">First Name *</label>
                  <input
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full border rounded-md px-4 py-2 text-sm"
                    placeholder="e.g., John"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Last Name *</label>
                  <input
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full border rounded-md px-4 py-2 text-sm"
                    placeholder="e.g., Doe"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Email *</label>
                  <input
                    type="email"
                    className="w-full border rounded-md px-4 py-2 text-sm bg-gray-100 cursor-not-allowed"
                    value={email}
                    disabled
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Contact Number *</label>
                  <input
                    name="contact"
                    type="tel"
                    value={formData.contact}
                    onChange={handleChange}
                    className="w-full border rounded-md px-4 py-2 text-sm"
                    placeholder="+91-XXXXXXXXXX"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">Country & State *</label>
                  <input
                    name="countryState"
                    type="text"
                    value={formData.countryState}
                    onChange={handleChange}
                    className="w-full border rounded-md px-4 py-2 text-sm"
                    placeholder="e.g., India, UP"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">Bio *</label>
                  <textarea
                    name="bio"
                    rows={3}
                    value={formData.bio}
                    onChange={handleChange}
                    className="w-full border rounded-md px-4 py-2 text-sm"
                    placeholder="Tell us about your experience..."
                  ></textarea>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Citizen ID Proof (PDF) *</label>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange(setCitizenIDFile)}
                    className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200"
                  />
                  {citizenIDFile && (
                    <p className="text-xs mt-1 text-green-600">Uploaded: {citizenIDFile.name}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Driving License (PDF) *</label>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange(setLicenseFile)}
                    className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200"
                  />
                  {licenseFile && (
                    <p className="text-xs mt-1 text-green-600">Uploaded: {licenseFile.name}</p>
                  )}
                </div>
              </div>
            </>
          )}

          {selectedStep === "Vehicle Info" && (
            <>
              <h3 className="text-lg font-medium mb-2">Do you want to use your personal vehicle?</h3>
              <div className="flex gap-4 mb-4">
                <button
                  onClick={() => setUsePersonalVehicle(true)}
                  className={`px-4 py-2 rounded-md ${
                    usePersonalVehicle ? "bg-indigo-600 text-white" : "bg-gray-200"
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => setUsePersonalVehicle(false)}
                  className={`px-4 py-2 rounded-md ${
                    usePersonalVehicle === false ? "bg-indigo-600 text-white" : "bg-gray-200"
                  }`}
                >
                  No
                </button>
              </div>

              {usePersonalVehicle && (
                <>
                  <div className="mb-4">
                    <label className="text-sm font-medium text-gray-700">Vehicle Name *</label>
                    <input
                      name="vehicleName"
                      type="text"
                      value={vehicleData.vehicleName}
                      onChange={handleVehicleChange}
                      className="w-full border rounded-md px-4 py-2 text-sm"
                      placeholder="e.g., Maruti Swift"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="text-sm font-medium text-gray-700">Vehicle Type *</label>
                    <select
                      name="vehicleType"
                      value={vehicleData.vehicleType}
                      onChange={handleVehicleChange}
                      className="w-full border rounded-md px-4 py-2 text-sm"
                    >
                      <option value="">Select Type</option>
                      <option value="bike">Bike</option>
                      <option value="scooty">Scooty</option>
                      <option value="car">Car</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="text-sm font-medium text-gray-700">Vehicle Number *</label>
                    <input
                      name="vehicleNumber"
                      type="text"
                      value={vehicleData.vehicleNumber}
                      onChange={handleVehicleChange}
                      className="w-full border rounded-md px-4 py-2 text-sm"
                      placeholder="e.g., UP32 AB 1234"
                    />
                  </div>

                  <div className="">
                    <label className="text-sm font-medium text-gray-700">Vehicle Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleVehicleImageChange}
                      className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200"
                    />
                  </div>
                  {vehicleImage && (
                    <p className="mb-4 text-xs mt-1 text-green-600">Uploaded: {vehicleImage.name}</p>
                  )}

                  <div className="">
                    <label className="text-sm font-medium text-gray-700">Vehicle Paperwork (PDF)</label>
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handleFileChange(setVehiclePaperwork)}
                      className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200"
                    />
                  </div>
                  {vehiclePaperwork && (
                    <p className="mb-4 text-xs mt-1 text-green-600">Uploaded: {vehiclePaperwork.name}</p>
                  )}
                </>
              )}
            </>
          )}

          <div className="mt-6 flex justify-end gap-2">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfile;
