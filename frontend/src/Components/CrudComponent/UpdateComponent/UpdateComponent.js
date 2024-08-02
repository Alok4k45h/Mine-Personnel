import React, { useState } from "react";
import axios from "axios";
import "./UpdateComponent.css";

const UpdateUser = () => {
  // State for form data & Response message
  const [formData, setFormData] = useState({
    Aadhar: "",
    updates: [{ field: "", value: "" }],
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [imageError, setImageError] = useState("");

  // Function to handle form input changes
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newUpdates = [...formData.updates];
    newUpdates[index] = { ...newUpdates[index], [name]: value };
    setFormData((prevState) => ({
      ...prevState,
      updates: newUpdates,
    }));
  };

  // Function to add new update field
  const handleAddField = () => {
    setFormData((prevState) => ({
      ...prevState,
      updates: [...prevState.updates, { field: "", value: "" }],
    }));
  };

  // Function to handle image input changes
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 500 * 1024) {
      // 500KB
      setImageError("Image size should not exceed 500KB.");
      setImage(null);
    } else {
      setImage(file);
      setImageError("");
    }
  };

  // Function to Validate formData before sending
  const validateFormData = () => {
    for (const update of formData.updates) {
      if (!update.field && !update.value && !image) {
        return "At least one field or image is required";
      }

      if (update.field && !update.value) {
        return "All selected fields must have a value.";
      }

      if (update.value && !update.field) {
        return "value cannot be updated without selecting field.";
      }
    }

    return null;
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errorMessage = validateFormData();
    if (errorMessage) {
      setMessage(errorMessage);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("Aadhar", formData.Aadhar);
      formDataToSend.append("updates", JSON.stringify(formData.updates));
      if (image) {
        formDataToSend.append("image", image);
      }

      const response = await axios.put(
        `http://localhost:5000/backend/user/${formData.Aadhar}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h2 className="text-white">Update User Details</h2>
        </div>
        <div className="col-12">
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                id="aadhar"
                name="Aadhar"
                placeholder="Enter Aadhar Number*"
                value={formData.Aadhar}
                className="w-60 m-3"
                onChange={(e) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    Aadhar: e.target.value,
                  }))
                }
                required
              />
            </div>
            {formData.updates.map((update, index) => (
              <div key={index}>
                <label className="mr-3 mb-3 text-light label-style">
                  Field to Update:
                  <select
                    name="field"
                    value={update.field}
                    className="mb-3 w-40"
                    onChange={(e) => handleChange(e, index)}
                  >
                    <option value="">Select Field</option>
                    <option value="Id">ID</option>
                    <option value="CompanyName">Company Name</option>
                    <option value="ContractorName">
                      Contractor Company Name
                    </option>
                    <option value="AuthorisationNo">Authorisation No.</option>
                    <option value="FormA">Form A No.</option>
                    <option value="EmployeeName">Employee Name</option>
                    <option value="FathersName">Father's Name</option>
                    <option value="Designation">Designation</option>
                    <option value="JoiningDate">Joining Date</option>
                    <option value="Birth">Date of Birth</option>
                    <option value="Licence">Licence</option>
                    <option value="Aadhar">Aadhar No.</option>
                    <option value="VtcNo">VTC No.</option>
                    <option value="VtcDate">VTC Date</option>
                    <option value="ImeNO">IME NO.</option>
                    <option value="ImeDate">IME Date</option>
                    <option value="IsIDCardIssued">IDCard Issued</option>
                    <option value="BloodGroup">Blood Group</option>
                    <option value="TempAddress">Temporary Address</option>
                    <option value="Contact">Contact Number</option>
                    <option value="ParmanentAddress">Parmanent Address</option>
                    <option value="IsPresent">Is Present</option>
                    <option value="BankName">Bank Name</option>
                    <option value="BankAc">Bank Account</option>
                    <option value="PAN">PAN No.</option>
                    <option value="NominiesName">Nominies Name</option>
                    <option value="NominiesAddress">Nominies Address</option>
                    <option value="NominiesRelation">Nominies Relation</option>
                    <option value="EmergencyNo">Emergency No.</option>
                  </select>
                </label>

                <input
                  type="text"
                  name="value"
                  placeholder="Enter value"
                  value={update.value}
                  className="w-60 mb-3"
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
            ))}

            <div className="text-center">
              <button
                type="button"
                className="btn btn-light mb-3"
                onClick={handleAddField}
              >
                Add more Field
              </button>
            </div>

            <label className="text-dark bg-white p-2 image-input">
              Update Image:
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                className=""
              />
              {imageError && <p className="text-danger">{imageError}</p>}
            </label>

            <div className="text-center">
              <button type="submit" className="btn btn-outline-light">
                Update
              </button>
              <p className="text-white mt-3 mb-3">
                *Note:- Date must be in mm/dd/yyyy format.
              </p>
            </div>
          </form>
          {message && <p className="mt-5 mb-5 res-message">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
