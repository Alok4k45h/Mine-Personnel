import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Use for dynamic routing
import axios from "axios";
import "./IdCardComponent.css";

const IdCardComponent = () => {
  const [Aadhar, setAadhar] = useState(""); // To store Aadhaar number
  const [message, setMessage] = useState(""); // To store error or success messages
  const navigate = useNavigate(); // To navigate to the IDCard page

  const handleChange = (e) => {
    setAadhar(e.target.value); // Update Aadhar state when input changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await axios.get(
        `https://socp-minepersonnel-backend.onrender.com/backend/user/${Aadhar}` // API request to fetch user data
      );
      // Navigate to the specific ID card URL with Aadhaar number and pass the fetched user data
      navigate(`/id-card/${Aadhar}`, { state: { user: response.data } });
    } catch (error) {
      setMessage(error.response?.data?.error || "Error fetching data"); // Set error message in case of failure
    }
  };

  return (
    <div className="container pt-5 pb-5">
      <div className="row">
        <div className="col-12">
          <h2 className="search-heading">EMPLOYEE ID CARD</h2>
        </div>
        <div className="col-12" data-aos="zoom-in-down">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={Aadhar} // Value bound to Aadhar state
              onChange={handleChange} // Call handleChange on input change
              placeholder="Enter Aadhar Number*"
              className="w-50 mt-5 mb-5"
              required
            />
            <div className="text-center">
              <button type="submit" className="btn btn-warning">
                Submit
              </button>
            </div>
          </form>
          {/* Display the error or success message */}
          {message && <p className="mt-5 mb-5 res-message">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default IdCardComponent;
