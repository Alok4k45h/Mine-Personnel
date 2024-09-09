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
        <h1 className="search-heading">USER DIRECTORY</h1>
        {/* Search Bar */}
        <div className="search-input-container shadow">
          <input
            type="search"
            className="search-input"
            placeholder="Search By Employee Name or Aadhar No."
            value={searchInput}
            onChange={onChangeSearchInput}
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/destinations-search-icon-img.png"
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
        <button
          onClick={toggleShowAll}
          className="btn btn-outline-light mt-5 mb-5"
        >
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
