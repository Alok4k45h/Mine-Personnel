import React, { useState } from "react";
import { jsPDF } from "jspdf";
import PropTypes from "prop-types";
import "./UserCard.css";
import IDCard from "../IDCard/IDCard";

// Reusable component for rendering individual detail fields
const DetailField = ({ label, value }) => (
  <div className="col-12 col-md-6 mb-2">
    <h4 className="detail-section-desc">
      {label}: {value || "N/A"}
    </h4>
  </div>
);

const UserCard = ({ data }) => {
  const [showIDCard, setShowIDCard] = useState(false);
  const modalId = `modal-${data.Aadhar}`;

  const fields = [
    { label: "Company Name", value: data.CompanyName },
    { label: "Contractor Name", value: data.ContractorName },
    { label: "ID No.", value: data.Id },
    { label: "Joining Date", value: data.JoiningDate },
    { label: "Authorisation No.", value: data.AuthorisationNo },
    { label: "Fathers Name", value: data.FathersName },
    { label: "Date of Birth", value: data.Birth },
    { label: "Blood Group", value: data.BloodGroup },
    { label: "Form-A No.", value: data.FormA },
    { label: "Driving Licence No.", value: data.Licence },
    { label: "PAN", value: data.PAN },
    { label: "VTC No.", value: data.VtcNo },
    { label: "VTC Date", value: data.VtcDate },
    { label: "IME/PME No.", value: data.ImeNO },
    { label: "IME/PME Date", value: data.ImeDate },
    { label: "Contact No.", value: data.Contact },
    { label: "Present or Absent", value: data.IsPresent },
    { label: "Bank Name", value: data.BankName },
    { label: "Bank A/C No.", value: data.BankAc },
    { label: "Nominee Name", value: data.NominiesName },
    { label: "Nominee Relation", value: data.NominiesRelation },
    { label: "Emergency Contact", value: data.EmergencyNo },
    { label: "Permanent Address", value: data.ParmanentAddress },
    { label: "Temporary Address", value: data.TempAddress },
    { label: "Nominee Address", value: data.NominiesAddress },
  ];

  const printUserLabels = () => {
    if (!data) return;

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const margin = 5;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Draw page boundary
    doc.setLineWidth(0.5);
    doc.rect(margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin);

    // MCL Logo
    doc.addImage(
      "https://res.cloudinary.com/alokkumar07/image/upload/v1726235667/socp_employees/mclLogo_d71zvn.png",
      "JPEG",
      margin + 1,
      margin + 5,
      60,
      30
    );

    // Employee Image
    if (data.empImage) {
      doc.addImage(data.empImage, "JPEG", pageWidth - 50, margin + 5, 40, 40);
    }

    // Header text
    let y = margin + 40;
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 102, 204); // Custom title color
    doc.text(`Name: ${data.EmployeeName}`, margin + 2, y);
    y += 7;
    doc.text(`Designation: ${data.Designation}`, margin + 2, y);
    y += 7;
    doc.text(`Aadhar No.: ${data.Aadhar}`, margin + 2, y);
    y += 10;

    // Detail Fields
    doc.setFontSize(10);
    doc.setTextColor(40);
    doc.setFont("helvetica", "normal");
    fields.forEach((field, index) => {
      if (
        field.label !== "Permanent Address" &&
        field.label !== "Temporary Address" &&
        field.label !== "Nominee Address"
      ) {
        const colPosition = margin + 2 + (index % 2) * (pageWidth / 2);
        const verticalPosition = y + Math.floor(index / 2) * 7;

        doc.text(`${field.label}:`, colPosition, verticalPosition);
        const wrappedText = doc.splitTextToSize(
          `${field.value || "N/A"}`,
          pageWidth / 2 - margin - 50 // Adjusted for label space
        );

        wrappedText.forEach((line, lineIndex) => {
          doc.text(line, colPosition + 35, verticalPosition + lineIndex * 7);
        });
      }
    });

    // Address Section
    const addressY = y + Math.floor((fields.length - 3) / 2) * 8 - 10; // Position for address section
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Address:", margin + 2, addressY);
    let currentY = addressY + 7; // Start below "Addresses:" with some space

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const addresses = [
      { label: "Permanent Address", value: data.ParmanentAddress },
      { label: "Temporary Address", value: data.TempAddress },
      { label: "Nominee Address", value: data.NominiesAddress },
    ];
    addresses.forEach((address) => {
      doc.text(`${address.label}:`, margin + 2, currentY);
      const wrappedAddress = doc.splitTextToSize(
        address.value || "N/A",
        pageWidth - 2 * margin - 50 // Adjusted for margins
      );
      wrappedAddress.forEach((line, lineIndex) => {
        doc.text(line, margin + 45, currentY + lineIndex * 7);
      });
      // Move the currentY position down for the next address
      currentY += wrappedAddress.length * 7; // Adjust spacing for next address
    });

    // Footer Section

    // Qr Code
    const footerY = pageHeight - margin - 40;
    if (data.qrCode) {
      doc.addImage(data.qrCode, "JPEG", margin + 5, footerY, 20, 20);
      doc.text("QR Code", margin + 7, footerY + 25);
    }

    // Employee Signature
    if (data.empSignature) {
      doc.addImage(
        data.empSignature,
        "JPEG",
        pageWidth / 2 - 20,
        footerY,
        40,
        20
      );
      doc.text("Employee Signature", pageWidth / 2 - 13, footerY + 25);
    }

    // Manager Signature
    if (data.managerSignature) {
      doc.addImage(
        data.managerSignature,
        "JPEG",
        pageWidth - 50,
        footerY,
        40,
        20
      );
      doc.text("Manager Signature", pageWidth - 48, footerY + 25);
    }

    doc.save(`${data.EmployeeName}.pdf`);
  };

  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="shadow-lg user-item-card p-3 mb-3">
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

              <div className="modal-body">
                <div className="detail-section">
                  <div className="container">
                    <div className="row">
                      <div className="col-12 col-md-4 mb-3 text-center">
                        <img
                          src={data.empImage}
                          alt="Employee"
                          className="emp-img p-5"
                          loading="lazy"
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
                          {fields.map((field, index) => (
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
                            QR Code
                          </h4>
                        </div>
                      )}
                      <div className="col-12 col-md-4 text-center">
                        <img
                          src={data.empSignature}
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
                          src={data.managerSignature}
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
                        <div className="col-12 text-center">
                          <IDCard data={data} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="modal-footer m-auto">
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => setShowIDCard(!showIDCard)}
                >
                  {showIDCard ? "Hide ID Card" : "Show ID Card"}
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={printUserLabels}
                >
                  Download PDF
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
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
  data: PropTypes.shape({
    EmployeeName: PropTypes.string.isRequired,
    Aadhar: PropTypes.string.isRequired,
    empImage: PropTypes.string,
    CompanyName: PropTypes.string,
    ContractorName: PropTypes.string,
    Id: PropTypes.string,
    JoiningDate: PropTypes.string,
    AuthorisationNo: PropTypes.string,
    FathersName: PropTypes.string,
    Birth: PropTypes.string,
    BloodGroup: PropTypes.string,
    FormA: PropTypes.string,
    Licence: PropTypes.string,
    PAN: PropTypes.string,
    VtcNo: PropTypes.string,
    VtcDate: PropTypes.string,
    ImeNO: PropTypes.string,
    ImeDate: PropTypes.string,
    ParmanentAddress: PropTypes.string,
    TempAddress: PropTypes.string,
    Contact: PropTypes.string,
    IsPresent: PropTypes.bool,
    BankName: PropTypes.string,
    BankAc: PropTypes.string,
    NominiesName: PropTypes.string,
    NominiesAddress: PropTypes.string,
    NominiesRelation: PropTypes.string,
    EmergencyNo: PropTypes.string,
    qrCode: PropTypes.string,
    empSignature: PropTypes.string,
    managerSignature: PropTypes.string,
    Designation: PropTypes.string,
  }).isRequired,
};

export default UserCard;
