import React from "react";
import PropTypes from "prop-types";
import "./IDCard.css";

const IDCard = ({ data }) => {
  const {
    EmployeeName,
    FathersName,
    ContractorName,
    Aadhar,
    Id,
    Designation,
    Birth,
    Licence,
    VtcNo,
    ImeNO,
    BloodGroup,
    Contact,
    empImage,
    qrCode,
    empSignature,
    managerSignature,
  } = data;

  const isContractor =
    ContractorName && ContractorName.toLowerCase() !== "departmental";

  return (
    <div className="container">
      <div className="row overflow-auto">
        {/* Front Side of ID Card */}
        <div className="col-12 col-md-6 mb-3">
          <div className="id-card p-3">
            <div className="row id-header p-2">
              <div className="col-4 text-center">
                <img
                  src="https://res.cloudinary.com/alokkumar07/image/upload/v1726235667/socp_employees/mclLogo_d71zvn.png"
                  alt="mcl-logo-img"
                  className="mcl-logo"
                />
              </div>
              <div className="col-8">
                <h1 className="header-h1 text-center">
                  SIARMAL OPENCAST PROJECT
                </h1>
                <h3 className="header-h3 text-center">
                  MAHALAXMI AREA, MCL, ODISHA-770076
                </h3>
                <h3 className="header-dsg text-center text-uppercase">
                  {ContractorName}
                </h3>
              </div>
            </div>

            <div className="row id-body p-2">
              <div className="col-4">
                <p className="id-para text-center text-capitalize">
                  ID Card No: {Id}
                </p>
                <img src={empImage} alt="Employee" className="empid-image" />
                <img
                  src={empSignature}
                  alt="Employee Signature"
                  className="id-sign"
                />
                <p className="id-para text-center p-2 text-capitalize">
                  Signature
                </p>
              </div>
              <div className="col-8 id-text-container">
                <h3 className="emp-name text-capitalize">{EmployeeName}</h3>
                <p className="id-para text-capitalize">
                  Father's name: {FathersName}
                </p>
                <p className="id-para text-capitalize">
                  Designation: {Designation}
                </p>
                <p className="id-para text-capitalize">Aadhar No: {Aadhar}</p>
                <p className="id-para">Date of Birth: {Birth}</p>
                <div className="text-end">
                  <img
                    src={managerSignature}
                    alt="Manager Signature"
                    className="id-sign"
                  />
                </div>
              </div>
            </div>
            <div className="row p-2">
              <div className="col-9 ml-auto">
                {isContractor && (
                  <div className="col-9 ml-auto text-capitalize text-center">
                    <p className="id-para text-center">
                      <span className="font-weight-bold">
                        Authorized Signatory
                      </span>
                      <br /> {ContractorName}
                    </p>
                  </div>
                )}
              </div>
              <div className="col-3">
                <p className="id-para text-center">
                  {" "}
                  <span className="font-weight-bold">Manager</span>
                  <br /> Siarmal OCP
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Back Side of ID Card */}
        <div className="col-12 col-md-6 mb-3">
          <div className="id-card p-3">
            <div className="row id-body">
              <div className="col-8 p-2">
                <div className="text-start">
                  <img
                    src="https://res.cloudinary.com/alokkumar07/image/upload/v1726235667/socp_employees/mclLogo_d71zvn.png"
                    alt="mcl-logo-img"
                    className="mcl-logo-back"
                  />
                </div>
                <div className="ml-4">
                  <p className="id-para text-capitalize">
                    Blood Group: {BloodGroup}
                  </p>
                  <p className="id-para">D/L No: {Licence}</p>
                  <p className="id-para">VTC No: {VtcNo}</p>
                  <p className="id-para">IME No: {ImeNO}</p>
                  <p className="id-para">Contact: {Contact}</p>
                </div>
              </div>
              <div className="col-4 mt-4">
                {qrCode && (
                  <img src={qrCode} alt="QR Code" className="qr-code-img" />
                )}
              </div>
              <p className="text-justify IDback-note p-2">
                <span className="span-note">Note: </span>This card is{" "}
                <span className="span-NT">NOT TRANSFERABLE</span> and testifies
                to holder's status as
                <span className="span-DG text-uppercase p-2">
                  {Designation}
                </span>
                of {ContractorName}- SIARMAL OCP and must be produced on demand.
                Its loss should be reported immediately to the Safety Office
                (Siarmal OCP) & must be surrendered on
                transfer/retirement/resignation or discharge from service.{" "}
                <br />
                <span className="span-msg">
                  If found please submit the card to Safety Office (Siarmal
                  OCP).
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

IDCard.propTypes = {
  data: PropTypes.object.isRequired,
};

export default IDCard;
