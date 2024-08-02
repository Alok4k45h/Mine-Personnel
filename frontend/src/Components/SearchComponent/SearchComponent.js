import React, { Component } from "react";
import PropTypes from "prop-types";
import "./SearchComponent.css";
import UserCard from "../Modal/UserCard";

class SearchComponent extends Component {
  // State for user
  state = {
    searchInput: "",
    showAll: false,
  };

  onChangeSearchInput = (event) => {
    this.setState({ searchInput: event.target.value });
  };

  toggleShowAll = () => {
    this.setState((prevState) => ({ showAll: !prevState.showAll }));
  };

  render() {
    const { searchInput, showAll } = this.state;
    const { UserData } = this.props;
    let displayedUsers = UserData;

    // Filter users if search input is provided
    if (searchInput.trim() !== "") {
      displayedUsers = UserData.filter(
        (data) =>
          data.EmployeeName.toLowerCase().includes(searchInput.toLowerCase()) ||
          data.Aadhar.toLowerCase().includes(searchInput.toLowerCase())
      );
    }

    // Show all users if showAll is true, otherwise show only limited users
    if (!showAll) {
      displayedUsers = displayedUsers.slice(0, 6); // Display only first 6 users
    }

    return (
      <div className="app-container">
        <div className="search-container">
          <h1 className="search-heading">USER DIRECTORY</h1>
          <div className="search-input-container shadow">
            <input
              type="search"
              className="search-input"
              placeholder="Search By Employee Name or Aadhar No."
              value={searchInput}
              onChange={this.onChangeSearchInput}
            />
            <img
              src="https://assets.ccbp.in/frontend/react-js/destinations-search-icon-img.png"
              alt="search icon"
              className="search-icon"
            />
          </div>

          <ul className="search-list">
            {displayedUsers.map((data) => (
              <UserCard key={data.Aadhar} data={data} />
            ))}
          </ul>

          <button
            onClick={this.toggleShowAll}
            className="btn btn-outline-light mt-5 mb-5"
          >
            {showAll ? "Close" : "Show All"}
          </button>
        </div>
      </div>
    );
  }
}

SearchComponent.propTypes = {
  UserData: PropTypes.array.isRequired,
};

export default SearchComponent;
