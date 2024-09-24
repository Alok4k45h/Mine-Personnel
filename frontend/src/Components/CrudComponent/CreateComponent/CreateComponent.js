import React, { useState } from "react";
import axios from "axios";
import "./CreateComponent.css";

const fieldNames = [
  "Id",
  "CompanyName",
  "ContractorName",
  "AuthorisationNo",
  "FormA",
  "EmployeeName",
  "FathersName",
  "Designation",
  "JoiningDate",
  "Birth",
  "Licence",
  "Aadhar",
  "VtcNo",
  "VtcDate",
  "ImeNO",
  "ImeDate",
  "IsIDCardIssued",
  "BloodGroup",
  "TempAddress",
  "Contact",
  "ParmanentAddress",
  "IsPresent",
  "BankName",
  "BankAc",
  "PAN",
  "NominiesName",
  "NominiesAddress",
  "NominiesRelation",
  "EmergencyNo",
];

const initialFormState = fieldNames.reduce((acc, field) => {
  acc[field] = "";
  return acc;
}, {});

const initialFileState = {
  empImage: null,
  empSignature: null,
  managerSignature: null,
};

const CreateComponent = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [files, setFiles] = useState(initialFileState);
  const [message, setMessage] = useState("");
  const [imageError, setImageError] = useState("");
  const [errors, setErrors] = useState({});

  // Validation rules
  const validateFields = () => {
    let tempErrors = {};
    const aadharRegex = /^[0-9]{12}$/;
    const contactRegex = /^[6-9]\d{9}$/;
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

    // Example validations
    if (!formData.EmployeeName)
      tempErrors.EmployeeName = "Employee Name is required";
    if (!formData.FathersName)
      tempErrors.FathersName = "Father's Name is required";
    if (!formData.Aadhar || !aadharRegex.test(formData.Aadhar))
      tempErrors.Aadhar = "Valid Aadhar number is required";
    if (!formData.Contact || !contactRegex.test(formData.Contact))
      tempErrors.Contact = "Valid number is required";
    if (!formData.EmergencyNo || !contactRegex.test(formData.EmergencyNo))
      tempErrors.EmergencyNo = "Valid number is required";
    if (formData.PAN && !panRegex.test(formData.PAN))
      tempErrors.PAN = "Invalid PAN";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Handle input changes for both text fields and files
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];

    if (file && file.size > 200 * 1024) {
      setImageError(`${name} size should not exceed 200KB.`);
      setFiles((prevState) => ({ ...prevState, [name]: null }));
    } else {
      setFiles((prevState) => ({ ...prevState, [name]: file }));
      setImageError("");
    }
  };

  // Submit form data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      return;
    }

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) =>
        formDataToSend.append(key, value)
      );
      Object.entries(files).forEach(([key, file]) => {
        if (file) formDataToSend.append(key, file);
      });

      const response = await axios.post(
        "https://socp-minepersonnel-backend.onrender.com/backend/user",
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setMessage(response.data.message);
      resetForm();
    } catch (error) {
      setMessage(
        error.response?.data?.error || "Submission failed. Please try again."
      );
    }
  };

  // Reset form data and files
  const resetForm = () => {
    setFormData(initialFormState);
    setFiles(initialFileState);
    setErrors({});
  };

  return (
    <div className="container pt-5 pb-5">
      <div className="row">
        <div className="col-12">
          <div className="form-container pt-5 pb-5">
            <h2 className="pt-3 pb-3 search-heading">INPUT EMPLOYEE DETAILS</h2>
            <form onSubmit={handleSubmit}>
              {fieldNames.map((field) => (
                <div
                  key={field}
                  className="form-group col-12"
                  data-aos="zoom-in-up"
                >
                  <label className="text-dark bg-white p-2 image-input">
                    {field.replace(/([A-Z])/g, " $1").trim()}:
                    <input
                      type={
                        field.includes("Date") || field === "Birth"
                          ? "date"
                          : "text"
                      }
                      id={field}
                      name={field}
                      value={formData[field]}
                      placeholder={field.replace(/([A-Z])/g, " $1").trim()}
                      onChange={handleInputChange}
                      required={[
                        "EmployeeName",
                        "FathersName",
                        "Aadhar",
                        "Contact",
                        "EmergencyNo",
                        "JoiningDate",
                        "Birth",
                      ].includes(field)}
                    />
                    {errors[field] && (
                      <p className="text-danger">{errors[field]}</p>
                    )}
                  </label>
                </div>
              ))}

              {["empImage", "empSignature", "managerSignature"].map(
                (fileField) => (
                  <div
                    key={fileField}
                    className="form-group col-12"
                    data-aos="zoom-in-down"
                  >
                    <label
                      htmlFor={fileField}
                      className="text-dark bg-white p-2 image-input"
                    >
                      Upload {fileField.replace(/([A-Z])/g, " $1").trim()}:
                      <input
                        type="file"
                        id={fileField}
                        name={fileField}
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                )
              )}

              {imageError && <p className="text-danger">{imageError}</p>}

              <button type="submit" className="btn btn-warning">
                Submit
              </button>
              <p className="text-warning mt-3 mb-3">
                Note - Upload Image within limit of 200 KB.
              </p>
            </form>

            {message && <p className="pt-5 pb-5 res-message">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateComponent;
