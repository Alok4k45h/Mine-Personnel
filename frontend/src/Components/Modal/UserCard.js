import React from "react";
import PropTypes from "prop-types";
import "./UserCard.css";

const UserCard = ({ data }) => {
  const {
    EmployeeName,
    Aadhar,
    Id,
    CompanyName,
    ContractorName,
    AuthorisationNo,
    Designation,
    FathersName,
    JoiningDate,
    Birth,
    FormA,
    Licence,
    VtcNo,
    VtcDate,
    ImeNO,
    ImeDate,
    IsIDCardIssued,
    BloodGroup,
    ParmanentAddress,
    TempAddress,
    Contact,
    IsPresent,
    BankName,
    BankAc,
    PAN,
    NominiesName,
    NominiesAddress,
    NominiesRelation,
    EmergencyNo,
    image,
  } = data;

  // creating modal id, target id and label id different for different users
  const modalId = EmployeeName.replace(/\s+/g, "-").toLowerCase();
  const targetId = `#${modalId}`;
  const labelID = `label-${modalId}`;

  return (
    <div className="col-12 col-md-6 col-lg-4">
      {/* User Card */}
      <div className="shadow user-item-card p-3 mb-3">
        <h1 className="user-card-title">{EmployeeName}</h1>
        <h1 className="user-card-desc">Aadhar No.: {Aadhar}</h1>

        <button
          type="button"
          className="btn btn-outline-dark"
          data-toggle="modal"
          data-target={targetId}
        >
          Detail
        </button>

        {/* Modal dialog */}
        <div
          className="modal fade"
          id={modalId}
          tabIndex="-1"
          aria-labelledby={labelID}
          aria-hidden="true"
        >
          <div className="modal-dialog modal-fullscreen">
            <div className="modal-content">
              {/* Modal Header */}
              <div className="modal-header">
                <h5 className="modal-title" id={labelID}>
                  Employee Detail
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              {/* Modal Body */}
              <div className="modal-body">
                <div className="detail-section pt-5 pb-5">
                  <div className="container">
                    <div className="row">
                      <div className="col-12 col-md-4 mb-3">
                        <img
                          src={`http://localhost:5000${image}`}
                          alt="userimage not found"
                          className="user-img p-5 text-info"
                        />

                        <h1 className="detail-section-heading text-center">
                          {EmployeeName}
                        </h1>
                        <h1 className="detail-section-desc text-center">
                          {Designation}
                        </h1>
                        <h1 className="detail-section-desc text-center">
                          Aadhar No.: {Aadhar}
                        </h1>
                      </div>

                      <div className="col-12 col-md-8">
                        <h1 className="detail-section-heading p-3">
                          Employee Details-
                        </h1>
                        <div className="container">
                          <div className="row">
                            <div className="col-12 col-md-6">
                              <h4 className="detail-section-desc">
                                Company Name: {CompanyName}
                              </h4>
                            </div>
                            <div className="col-12 col-md-6">
                              <h4 className="detail-section-desc">
                                Contractor Company Name: {ContractorName}
                              </h4>
                            </div>
                            <div className="col-12 col-md-6">
                              <h4 className="detail-section-desc">
                                I/D Card Issued: {IsIDCardIssued}
                              </h4>
                            </div>
                            <div className="col-12 col-md-6">
                              <h4 className="detail-section-desc">
                                ID No.: {Id}
                              </h4>
                            </div>
                            <div className="col-12 col-md-6">
                              <h4 className="detail-section-desc">
                                Joining Date: {JoiningDate}
                              </h4>
                            </div>
                            <div className="col-12 col-md-6">
                              <h4 className="detail-section-desc">
                                Authorisation No.: {AuthorisationNo}
                              </h4>
                            </div>
                            <div className="col-12 col-md-6">
                              <h4 className="detail-section-desc">
                                Fathers Name: {FathersName}
                              </h4>
                            </div>

                            <div className="col-12 col-md-6">
                              <h4 className="detail-section-desc">
                                Date of Birth: {Birth}
                              </h4>
                            </div>
                            <div className="col-12 col-md-6">
                              <h4 className="detail-section-desc">
                                Blood Group: {BloodGroup}
                              </h4>
                            </div>
                            <div className="col-12 col-md-6">
                              <h4 className="detail-section-desc">
                                Form-A No.: {FormA}
                              </h4>
                            </div>
                            <div className="col-12 col-md-6">
                              <h4 className="detail-section-desc">
                                Driving Licence No.: {Licence}
                              </h4>
                            </div>
                            <div className="col-12 col-md-6">
                              <h4 className="detail-section-desc">
                                PAN: {PAN}
                              </h4>
                            </div>
                            <div className="col-12 col-md-6">
                              <h4 className="detail-section-desc">
                                VTC. No.: {VtcNo}
                              </h4>
                            </div>
                            <div className="col-12 col-md-6">
                              <h4 className="detail-section-desc">
                                VTC Date: {VtcDate}
                              </h4>
                            </div>
                            <div className="col-12 col-md-6">
                              <h4 className="detail-section-desc">
                                IME/PME No.: {ImeNO}
                              </h4>
                            </div>
                            <div className="col-12 col-md-6">
                              <h4 className="detail-section-desc">
                                IME/PME Date: {ImeDate}
                              </h4>
                            </div>

                            <div className="col-12 col-md-6">
                              <h4 className="detail-section-desc">
                                Parmanent Address: {ParmanentAddress}
                              </h4>
                            </div>
                            <div className="col-12 col-md-6">
                              <h4 className="detail-section-desc">
                                Temporary Address: {TempAddress}
                              </h4>
                            </div>
                            <div className="col-12 col-md-6">
                              <h4 className="detail-section-desc">
                                Contact NO.: {Contact}
                              </h4>
                            </div>
                            <div className="col-12 col-md-6">
                              <h4 className="detail-section-desc">
                                Present or Absent: {IsPresent}
                              </h4>
                            </div>
                            <div className="col-12 col-md-6">
                              <h4 className="detail-section-desc">
                                Bank Name: {BankName}
                              </h4>
                            </div>
                            <div className="col-12 col-md-6">
                              <h4 className="detail-section-desc">
                                Bank A/C No.: {BankAc}
                              </h4>
                            </div>
                            <div className="col-12 col-md-6">
                              <h4 className="detail-section-desc">
                                Nominies Name: {NominiesName}
                              </h4>
                            </div>
                            <div className="col-12 col-md-6">
                              <h4 className="detail-section-desc">
                                Nominies Address: {NominiesAddress}
                              </h4>
                            </div>
                            <div className="col-12 col-md-6">
                              <h4 className="detail-section-desc">
                                Nominee Relation: {NominiesRelation}
                              </h4>
                            </div>
                            <div className="col-12 col-md-6">
                              <h4 className="detail-section-desc">
                                Emergency Contact No: {EmergencyNo}
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Add more details here */}
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
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
