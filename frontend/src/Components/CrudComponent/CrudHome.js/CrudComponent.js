import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchComponent from "../../SearchComponent/SearchComponent";
import CreateComponent from "../CreateComponent/CreateComponent";
import UpdateComponent from "../UpdateComponent/UpdateComponent";
import DeleteComponent from "../DeleteComponent/DeleteComponent";
import "./CrudComponent.css";

function CrudComponent() {
  const [selectedComponent, setSelectedComponent] = useState("UserData");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/backend/user/all"
        );
        setUsers(response.data);
        setLoading(false);
        setError("");
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchUsers();
  }, [selectedComponent]);

  const handleComponentChange = (component) => {
    setSelectedComponent(component);
  };

  return (
    <div className="container-fluid home-container">
      <div className="row">
        {/* Side Button Container */}
        <div className="col-12 col-md-3 d-flex flex-column justify-content-center text-center side-container">
          {/* user button */}
          <div>
            <button
              className={`btn btn-outline-light w-50 p-3 m-3 ${
                selectedComponent === "UserData" ? "active" : ""
              }`}
              onClick={() => handleComponentChange("UserData")}
            >
              User Data
            </button>
          </div>

          {/*Create user button */}
          <div>
            <button
              className={`btn btn-outline-light w-50 p-3 m-3 ${
                selectedComponent === "CreateUser" ? "active" : ""
              }`}
              onClick={() => handleComponentChange("CreateUser")}
            >
              Create User
            </button>
          </div>

          {/*Update user button */}
          <div>
            <button
              className={`btn btn-outline-light w-50 p-3 m-3 ${
                selectedComponent === "UpdateUser" ? "active" : ""
              }`}
              onClick={() => handleComponentChange("UpdateUser")}
            >
              Update User
            </button>
          </div>

          {/* Delete user button */}
          <div>
            <button
              className={`btn btn-outline-light w-50 p-3 m-3 ${
                selectedComponent === "DeleteUser" ? "active" : ""
              }`}
              onClick={() => handleComponentChange("DeleteUser")}
            >
              Delete User
            </button>
          </div>
        </div>

        {/* Main Content Container */}
        <div className="col-12 col-md-9 d-flex flex-column justify-content-center text-center">
          {loading && (
            <p className="pt-5 pb-5 loading text-white">
              Loading
              <img
                src="https://cdn.pixabay.com/animation/2022/07/29/03/42/03-42-11-849_512.gif"
                alt=""
                className="loading-img"
              />
            </p>
          )}
          {error && <p className="pt-5 pb-5 loading text-danger">{error}</p>}
          {selectedComponent === "UserData" && (
            <SearchComponent UserData={users} />
          )}
          {selectedComponent === "CreateUser" && <CreateComponent />}
          {selectedComponent === "UpdateUser" && <UpdateComponent />}
          {selectedComponent === "DeleteUser" && <DeleteComponent />}
        </div>
      </div>
    </div>
  );
}

export default CrudComponent;
