import clinicService from "../services/clinicService";

let createClinic = async (req, res) => {
  try {
    let create = await clinicService.createClinic(req.body);
    return res.status(200).json(create);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getAllClinic = async (req, res) => {
  try {
    let get = await clinicService.getAllClinic();
    return res.status(200).json(get);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getDetailClinic = async (req, res) => {
  try {
    let get = await clinicService.getDetailClinic(req.query.id);
    return res.status(200).json(get);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
module.exports = {
  createClinic,
  getAllClinic,
  getDetailClinic,
};
