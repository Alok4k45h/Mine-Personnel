import React, { useState } from "react";
import axios from "axios";
import "./DeleteComponent.css";

const DeleteUser = () => {
  // state for form data and response messages
  const [Aadhar, setAadhar] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setAadhar(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        `https://socp-minepersonnel-backend.onrender.com/backend/user/${Aadhar}`
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <div className="container pt-5 pb-5">
      <div className="row">
        <div className="col-12">
          <h2 className="search-heading">DELETE EMPLOYEE DETAIL</h2>
        </div>
        <div className="col-12" data-aos="zoom-in-down">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={Aadhar}
              onChange={handleChange}
              placeholder="Enter Aadhar Number*"
              className="w-50 mt-5 mb-5"
              required
            />
            <div className="text-center">
              <button type="submit" className="btn btn-warning">
                Delete
              </button>
            </div>
          </form>
          {message && <p className="mt-5 mb-5 res-message">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default DeleteUser;
