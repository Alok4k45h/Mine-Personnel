import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import "./UserCard.css";
import IDCard from "../IDCard/IDCard";

// Reusable component for rendering individual detail fields
const DetailField = ({ label, value }) => (
  <div className="col-12 col-md-6">
    <h4 className="detail-section-desc">
      {label}: {value || "N/A"}
    </h4>
  </div>
);

const UserCard = ({ data }) => {
  const [showIDCard, setShowIDCard] = useState(false);
  const modalContentRef = useRef(null);
  const idCardRef = useRef(null);

  const modalId = `modal-${data.Aadhar}`;

  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="shadow user-item-card p-3 mb-3">
        <h1 className="user-card-title">{data.EmployeeName}</h1>
        <h1 className="user-card-desc">Aadhar No.: {data.Aadhar}</h1>

        <button
          type="button"
          className="btn btn-outline-dark"
          data-toggle="modal"
          data-target={`#${modalId}`}
        >
          Detail
        </button>

        {/* Modal */}
        <div
          className="modal fade"
          id={modalId}
          tabIndex="-1"
          aria-labelledby={`label-${modalId}`}
          aria-hidden="true"
        >
          <div className="modal-dialog modal-fullscreen">
            <div className="modal-content">
              <div className="modal-header m-auto">
                <h5 className="modal-title" id={`label-${modalId}`}>
                  COMPLETE EMPLOYEE DETAILS
                </h5>
              </div>

              <div className="modal-body" ref={modalContentRef}>
                <div className="detail-section">
                  <div className="container">
                    {/* Employee Details Section */}
                    <div className="row">
                      <div className="col-12 col-md-4 mb-3 text-center">
                        <img
                          src={`http://localhost:5000${data.empImage}`}
                          alt="Employee"
                          className="emp-img p-5"
                          loading="lazy" // Lazy load image for better performance
                        />
                        <h1 className="detail-section-heading text-center">
                          {data.EmployeeName}
                        </h1>
                        <h1 className="detail-section-desc text-center">
                          {data.Designation}
                        </h1>
                        <h1 className="detail-section-desc text-center">
                          Aadhar No.: {data.Aadhar}
                        </h1>
                      </div>

                      <div className="col-12 col-md-8 mt-5">
                        <div className="row">
                          {/* Rendering detail fields dynamically */}
                          {[
                            { label: "Company Name", value: data.CompanyName },
                            {
                              label: "Contractor Name",
                              value: data.ContractorName,
                            },
                            { label: "ID No.", value: data.Id },
                            { label: "Joining Date", value: data.JoiningDate },
                            {
                              label: "Authorisation No.",
                              value: data.AuthorisationNo,
                            },
                            { label: "Fathers Name", value: data.FathersName },
                            { label: "Date of Birth", value: data.Birth },
                            { label: "Blood Group", value: data.BloodGroup },
                            { label: "Form-A No.", value: data.FormA },
                            {
                              label: "Driving Licence No.",
                              value: data.Licence,
                            },
                            { label: "PAN", value: data.PAN },
                            { label: "VTC No.", value: data.VtcNo },
                            { label: "VTC Date", value: data.VtcDate },
                            { label: "IME/PME No.", value: data.ImeNO },
                            { label: "IME/PME Date", value: data.ImeDate },
                            {
                              label: "Permanent Address",
                              value: data.ParmanentAddress,
                            },
                            {
                              label: "Temporary Address",
                              value: data.TempAddress,
                            },
                            { label: "Contact No.", value: data.Contact },
                            {
                              label: "Present or Absent",
                              value: data.IsPresent,
                            },
                            { label: "Bank Name", value: data.BankName },
                            { label: "Bank A/C No.", value: data.BankAc },
                            { label: "Nominee Name", value: data.NominiesName },
                            {
                              label: "Nominee Address",
                              value: data.NominiesAddress,
                            },
                            {
                              label: "Nominee Relation",
                              value: data.NominiesRelation,
                            },
                            {
                              label: "Emergency Contact No.",
                              value: data.EmergencyNo,
                            },
                          ].map((field, index) => (
                            <DetailField
                              key={index}
                              label={field.label}
                              value={field.value}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* QR Code & Signature Section */}
                    <div className="row">
                      {data.qrCode && (
                        <div className="col-12 col-md-4 text-center">
                          <img
                            src={data.qrCode}
                            alt="Employee QR Code"
                            className="qr-code-img p-5"
                            loading="lazy"
                          />
                          <h4 className="detail-section-desc text-center">
                            Scan QR Code
                          </h4>
                        </div>
                      )}
                      <div className="col-12 col-md-4 text-center">
                        <img
                          src={`http://localhost:5000${data.empSignature}`}
                          alt="Employee Signature"
                          className="emp-sign p-5"
                          loading="lazy"
                        />
                        <h4 className="detail-section-desc text-center">
                          Employee Signature
                        </h4>
                      </div>
                      <div className="col-12 col-md-4 text-center">
                        <img
                          src={`http://localhost:5000${data.managerSignature}`}
                          alt="Manager Signature"
                          className="manager-sign p-5"
                          loading="lazy"
                        />
                        <h4 className="detail-section-desc text-center">
                          Manager Signature
                        </h4>
                      </div>
                    </div>

                    {/* ID Card Section */}
                    {showIDCard && (
                      <div className="row mt-5">
                        <div className="col-12 text-center" ref={idCardRef}>
                          <IDCard data={data} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="modal-footer m-auto">
                <button
                  type="button"
                  className="btn btn-outline-dark"
                  onClick={() => setShowIDCard(!showIDCard)}
                >
                  {showIDCard ? "Hide ID Card" : "Show ID Card"}
                </button>
                <button
                  type="button"
                  className="btn btn-dark"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

UserCard.propTypes = {
  data: PropTypes.object.isRequired,
};

export default UserCard;
