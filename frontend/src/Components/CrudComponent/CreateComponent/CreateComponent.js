import React, { useState } from "react";
import axios from "axios";
import "./CreateComponent.css";

const CreateComponent = () => {
  // State for form data
  const [formData, setFormData] = useState({
    Id: "",
    CompanyName: "",
    ContractorName: "",
    AuthorisationNo: "",
    FormA: "",
    EmployeeName: "",
    FathersName: "",
    Designation: "",
    JoiningDate: "",
    Birth: "",
    Licence: "",
    Aadhar: "",
    VtcNo: "",
    VtcDate: "",
    ImeNO: "",
    ImeDate: "",
    IsIDCardIssued: "",
    BloodGroup: "",
    TempAddress: "",
    Contact: "",
    ParmanentAddress: "",
    IsPresent: "",
    BankName: "",
    BankAc: "",
    PAN: "",
    NominiesName: "",
    NominiesAddress: "",
    NominiesRelation: "",
    EmergencyNo: "",
  });

  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [imageError, setImageError] = useState("");

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
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

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });
      if (image) {
        formDataToSend.append("image", image);
      }
      // Send form data to backend using Axios
      const response = await axios.post(
        "http://localhost:5000/backend/user",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(response.data.message);
      // Reset form data after successful submission
      setFormData((prevState) => ({
        ...prevState,
        Id: "",
        CompanyName: "",
        ContractorName: "",
        AuthorisationNo: "",
        FormA: "",
        EmployeeName: "",
        FathersName: "",
        Designation: "",
        JoiningDate: "",
        Birth: "",
        Licence: "",
        Aadhar: "",
        VtcNo: "",
        VtcDate: "",
        ImeNO: "",
        ImeDate: "",
        IsIDCardIssued: "",
        BloodGroup: "",
        TempAddress: "",
        Contact: "",
        ParmanentAddress: "",
        IsPresent: "",
        BankName: "",
        BankAc: "",
        PAN: "",
        NominiesName: "",
        NominiesAddress: "",
        NominiesRelation: "",
        EmergencyNo: "",
      }));
      setImage(null);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <div className="container pt-5 pb-5">
      <div className="row">
        <div className="col-12">
          <div className="form-container pt-5 pb-5">
            <h2 className="pt-3 pb-3 text-white">Input User Details</h2>
            <form onSubmit={handleSubmit}>
              {/* Input fields for user data */}
              <div className="container">
                <div className="row">
                  <div className="form-group col-md-6">
                    <input
                      type="text"
                      name="Id"
                      placeholder="ID NO.*"
                      value={formData.Id}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <input
                      type="text"
                      name="CompanyName"
                      placeholder="Company Name*"
                      value={formData.CompanyName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <input
                      type="text"
                      name="ContractorName"
                      placeholder="Contractor Company Name*"
                      value={formData.ContractorName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <input
                      type="text"
                      name="AuthorisationNo"
                      placeholder="Authorisation No."
                      value={formData.AuthorisationNo}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <input
                      type="text"
                      name="FormA"
                      placeholder="Form A"
                      value={formData.FormA}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <input
                      type="text"
                      name="EmployeeName"
                      placeholder="Employee Name*"
                      value={formData.EmployeeName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <input
                      type="text"
                      name="FathersName"
                      placeholder="Father's Name*"
                      value={formData.FathersName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <input
                      type="text"
                      name="Designation"
                      placeholder="Designation"
                      value={formData.Designation}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label className="text-dark bg-white p-2">
                      Joining Date:
                      <input
                        type="date"
                        name="JoiningDate"
                        placeholder="Joining Date"
                        value={formData.JoiningDate}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                  <div className="form-group col-md-6">
                    <label className="text-dark bg-white p-2">
                      Date of Birth:
                      <input
                        type="date"
                        name="Birth"
                        placeholder="Birth Date"
                        value={formData.Birth}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                  <div className="form-group col-md-6">
                    <input
                      type="text"
                      name="Licence"
                      placeholder="Licence"
                      value={formData.Licence}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <input
                      type="text"
                      name="Aadhar"
                      placeholder="Aadhar Number*"
                      value={formData.Aadhar}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <input
                      type="text"
                      name="VtcNo"
                      placeholder="VTC No."
                      value={formData.VtcNo}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label className="text-dark bg-white p-2">
                      VTC Date:
                      <input
                        type="date"
                        name="VtcDate"
                        placeholder="VTC Date"
                        value={formData.VtcDate}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                  <div className="form-group col-md-6">
                    <input
                      type="text"
                      name="ImeNO"
                      placeholder="IME NO."
                      value={formData.ImeNO}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label className="text-dark bg-white p-2">
                      IME Date:
                      <input
                        type="date"
                        name="ImeDate"
                        placeholder="IME Date"
                        value={formData.ImeDate}
                        onChange={handleChange}
                      />{" "}
                    </label>
                  </div>
                  <div className="form-group col-md-6">
                    <input
                      type="text"
                      name="IsIDCardIssued"
                      placeholder="Is ID Card Issued"
                      value={formData.IsIDCardIssued}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <input
                      type="text"
                      name="BloodGroup"
                      placeholder="Blood Group"
                      value={formData.BloodGroup}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <input
                      type="text"
                      name="TempAddress"
                      placeholder="Temporary Address"
                      value={formData.TempAddress}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <input
                      type="text"
                      name="Contact"
                      placeholder="Contact Number*"
                      value={formData.Contact}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <input
                      type="text"
                      name="ParmanentAddress"
                      placeholder="Permanent Address"
                      value={formData.ParmanentAddress}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <input
                      type="text"
                      name="IsPresent"
                      placeholder="Is Present"
                      value={formData.IsPresent}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <input
                      type="text"
                      name="BankName"
                      placeholder="Bank Name"
                      value={formData.BankName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <input
                      type="text"
                      name="BankAc"
                      placeholder="Bank Account Number"
                      value={formData.BankAc}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <input
                      type="text"
                      name="PAN"
                      placeholder="PAN"
                      value={formData.PAN}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <input
                      type="text"
                      name="NominiesName"
                      placeholder="Nominee's Name"
                      value={formData.NominiesName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <input
                      type="text"
                      name="NominiesAddress"
                      placeholder="Nominee's Address"
                      value={formData.NominiesAddress}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <input
                      type="text"
                      name="NominiesRelation"
                      placeholder="Nominee's Relation"
                      value={formData.NominiesRelation}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <input
                      type="text"
                      name="EmergencyNo"
                      placeholder="Emergency Contact Number*"
                      value={formData.EmergencyNo}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <input
                      type="file"
                      name="image"
                      placeholder="Upload User Image"
                      onChange={handleImageChange}
                    />
                    {imageError && <p className="text-danger">{imageError}</p>}
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-outline-light">
                Submit
              </button>
            </form>
            {message && <p className="pt-5 pb-5 res-message">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateComponent;
