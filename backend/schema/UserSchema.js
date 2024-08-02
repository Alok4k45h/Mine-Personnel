//User schema with validation to store in database
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    Id: {
      // type: Number,
      // require: true,
    },
    CompanyName: {
      // type: String,
    },
    ContractorName: {
      // type: String,
    },
    AuthorisationNo: {
      // type: String,
    },
    FormA: {
      // type: String,
    },
    EmployeeName: {
      // type: String,
      // require: true,
    },
    FathersName: {
      // type: String,
      // require: true,
    },
    Designation: {
      // type: String,
    },
    JoiningDate: {
      // type: Date,
      // require: true,
    },
    Birth: {
      // type: Date,
      // require: true,
    },
    Licence: {
      // type: String,
    },
    Aadhar: {
      type: String,
      require: true,
      unique: true,
    },
    VtcNo: {
      // type: Number,
    },
    VtcDate: {
      // type: Date,
    },
    ImeNO: {
      // type: Number,
    },
    ImeDate: {
      // type: Date,
    },
    IsIDCardIssued: {
      // type: String,
    },
    BloodGroup: {
      // type: String,
    },
    TempAddress: {
      // type: String,
    },
    Contact: {
      // type: Number,
      // require: true,
    },
    ParmanentAddress: {
      // type: String,
    },
    IsPresent: {
      // type: String,
    },
    BankName: {
      // type: String,
    },
    BankAc: {
      // type: string,
      // unique: true,
    },
    PAN: {
      // type: string,
      // unique: true,
    },
    NominiesName: {
      // type: String,
    },
    NominiesAddress: {
      // type: String,
    },
    NominiesRelation: {
      // type: String,
    },
    EmergencyNo: {
      // type: Number,
      // require: true,
    },
    image: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
