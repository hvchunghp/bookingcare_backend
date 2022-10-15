import doctorService from "../services/doctorService";

let getDoctors = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) limit = 5;
  try {
    let response = await doctorService.getDoctors(+limit);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "error: " + error,
    });
  }
};

let getAllDoctors = async (req, res) => {
  try {
    let doctors = await doctorService.getAllDoctors();
    return res.status(200).json(doctors);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "error: " + error,
    });
  }
};
let postInfoDoctors = async (req, res) => {
  try {
    let response = await doctorService.saveDetailInfoDocotr(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "error: " + error,
    });
  }
};
let getDetailsDoctors = async (req, res) => {
  try {
    let infor = await doctorService.getDetailsDoctorById(req.query.id);
    return res.status(200).json(infor);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "error: " + error,
    });
  }
};
let bulkCreateSchedules = async (req, res) => {
  try {
    let infor = await doctorService.bulkCreateSchedules(req.body);
    return res.status(200).json(infor);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "error: " + error,
    });
  }
};
let getScheduleByDate = async (req, res) => {
  try {
    let infor = await doctorService.getScheduleByDate(
      req.query.doctorId,
      req.query.date
    );
    return res.status(200).json(infor);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "error: " + error,
    });
  }
};

let getExtraInfoById = async (req, res) => {
  try {
    let infor = await doctorService.getExtraInfoById(req.query.doctorId);
    return res.status(200).json(infor);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "error: " + error,
    });
  }
};
let getProfileDoctorById = async (req, res) => {
  try {
    let doctors = await doctorService.getProfileDoctorById(req.query.doctorId);
    return res.status(200).json(doctors);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "error: " + error,
    });
  }
};

let getPatientBooking = async (req, res) => {
  try {
    let doctors = await doctorService.getPatientBooking(
      req.query.doctorId,
      req.query.date
    );
    return res.status(200).json(doctors);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "error: " + error,
    });
  }
};

let updateStatusBooking = async (req, res) => {
  try {
    let doctors = await doctorService.updateStatusBooking(req.body);
    return res.status(200).json(doctors);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "error: " + error,
    });
  }
};
module.exports = {
  getDoctors,
  getAllDoctors,
  postInfoDoctors,
  getDetailsDoctors,
  bulkCreateSchedules,
  getScheduleByDate,
  getExtraInfoById,
  getProfileDoctorById,
  getPatientBooking,
  updateStatusBooking,
};
