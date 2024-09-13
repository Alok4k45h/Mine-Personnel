//User schema with validation to store in database
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    Id: {},
    CompanyName: {},
    ContractorName: {},
    AuthorisationNo: {},
    FormA: {},
    EmployeeName: {},
    FathersName: {},
    Designation: {},
    JoiningDate: {},
    Birth: {},
    Licence: {},
    Aadhar: {
      type: String,
      require: true,
      unique: true,
    },
    VtcNo: {},
    VtcDate: {},
    ImeNO: {},
    ImeDate: {},
    IsIDCardIssued: {},
    BloodGroup: {},
    TempAddress: {},
    Contact: {},
    ParmanentAddress: {},
    IsPresent: {},
    BankName: {},
    BankAc: {},
    PAN: {},
    NominiesName: {},
    NominiesAddress: {},
    NominiesRelation: {},
    EmergencyNo: {},
    empImage: {},
    empSignature: {},
    managerSignature: {},
    empImageId: {},
    empSignatureId: {},
    managerSignatureId: {},
    qrCode: {},
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
