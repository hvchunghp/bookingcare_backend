import db from "../models/index";

let createClinic = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.description ||
        !data.descriptionHTML ||
        !data.address ||
        !data.imgBase64
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        await db.Clinic.create({
          name: data.name,
          description: data.description,
          descriptionHTML: data.descriptionHTML,
          address: data.address,
          image: data.imgBase64,
        });
        resolve({
          errCode: 0,
          errMessage: "ok",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getAllClinic = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Clinic.findAll({
        attributes: {
          exclude: ["descriptionHTML", "description"],
        },
      });

      resolve({
        errMessage: "ok",
        errCode: 0,
        data,
      });
    } catch (error) {
      reject(error);
    }
  });
};
let getDetailClinic = (idInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = {};
      let arrDoctor = {};
      if (!idInput) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        data = await db.Clinic.findOne({
          where: {
            id: idInput,
          },
          attributes: ["descriptionHTML", "image"],
        });
        if (data) {
          arrDoctor = await db.Doctor_info.findAll({
            where: {
              clinicId: idInput,
            },
            attributes: ["doctorId"],
          });
        } else {
          data = {};
        }
        resolve({
          errCode: 0,
          errMessage: "ok",
          data,
          arrDoctor,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  createClinic,
  getAllClinic,
  getDetailClinic,
};
