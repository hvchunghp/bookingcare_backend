import specialtyService from "../services/specialtyService";

let createSpecialty = async (req, res) => {
  try {
    let create = await specialtyService.createSpecialty(req.body);
    return res.status(200).json(create);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getAllSpecialty = async (req, res) => {
  try {
    let get = await specialtyService.getAllSpecialty();
    return res.status(200).json(get);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getDetailSpeicalty = async (req, res) => {
  try {
    let get = await specialtyService.getDetailSpeicalty(req.query.id);
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
  createSpecialty,
  getAllSpecialty,
  getDetailSpeicalty,
};
