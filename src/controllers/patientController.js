import patientService from "../services/patientService";

let patientBookAppointment = async (req, res) => {
  try {
    let book = await patientService.bookAppointment(req.body);
    return res.status(200).json(book);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let verifyBooking = async (req, res) => {
  try {
    let book = await patientService.verifyBooking(req.body);
    return res.status(200).json(book);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
module.exports = {
  patientBookAppointment,
  verifyBooking,
};
