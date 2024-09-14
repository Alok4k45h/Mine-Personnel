import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // For getting Aadhaar number from URL and navigation
import axios from "axios";
import IDCard from "../../Components/Modal/IDCard/IDCard";

const IDCardPage = () => {
  const { Aadhaar } = useParams(); // Get Aadhaar number from URL
  const navigate = useNavigate(); // For navigation back to home

  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://socp-minepersonnel-backend.onrender.com/backend/user/${Aadhaar}`
        );
        setUser(response.data);
      } catch (error) {
        setMessage(error.response?.data?.error || "Error fetching user data");
      }
    };
    fetchData();
  }, [Aadhaar]); // Dependency array ensures fetching happens only when Aadhaar changes

  // Go back to homepage
  const goBack = () => {
    navigate("/");
  };

  return (
    <div className="container-fluid home-container pt-5 pb-5">
      <div className="row">
        <div className="col-12">
          <h2 className="search-heading">Employee ID Card</h2>
          {user ? (
            <IDCard data={user} />
          ) : (
            <p className="text-white">{message || "Loading user data..."}</p>
          )}
          <button className="btn btn-warning mt-5" onClick={goBack}>
            HomePage
          </button>
        </div>
      </div>
    </div>
  );
};

export default IDCardPage;
