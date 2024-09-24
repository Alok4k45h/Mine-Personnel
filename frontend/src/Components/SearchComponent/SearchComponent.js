import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import "./SearchComponent.css";
import UserCard from "../Modal/UserCard/UserCard";

const SearchComponent = ({ UserData }) => {
  const [searchInput, setSearchInput] = useState("");
  const [showAll, setShowAll] = useState(false);

  const onChangeSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  const toggleShowAll = () => {
    setShowAll((prevShowAll) => !prevShowAll);
  };

  // Memoize filtered users to avoid unnecessary recalculations
  const displayedUsers = useMemo(() => {
    let filteredUsers = UserData;
    if (searchInput.trim()) {
      filteredUsers = UserData.filter(
        ({ EmployeeName, Aadhar }) =>
          EmployeeName.toLowerCase().includes(searchInput.toLowerCase()) ||
          String(Aadhar).includes(searchInput)
      );
    }
    if (!showAll) {
      return filteredUsers.slice(0, 6); // Show only first 6 users
    }
    return filteredUsers;
  }, [UserData, searchInput, showAll]);

  return (
    <div className="app-container">
      <div className="search-container">
        <h1 className="search-heading">EMPLOYEE DIRECTORY</h1>
        {/* Search Bar */}
        <div className="search-input-container shadow">
          <input
            type="search"
            id="search-input"
            className="search-input"
            placeholder="Search By Employee Name or Aadhar No."
            value={searchInput}
            onChange={onChangeSearchInput}
          />
          <img
            src="https://res.cloudinary.com/alokkumar07/image/upload/v1726239828/socp_employees/searchIcon_t0ufb1.png"
            alt="search icon"
            className="search-icon"
          />
        </div>

        {/* User Card */}
        <ul className="search-list">
          {displayedUsers.map((data) => (
            <UserCard key={data.Aadhar} data={data} />
          ))}
        </ul>

        {/* Show Button */}
        <button onClick={toggleShowAll} className="btn btn-warning mt-5 mb-5">
          {showAll ? "Close" : "Show All"}
        </button>
      </div>
    </div>
  );
};

SearchComponent.propTypes = {
  UserData: PropTypes.array.isRequired,
};

export default SearchComponent;
