import db from "../models/index";

let createSpecialty = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.description ||
        !data.descriptionHTML ||
        !data.imgBase64
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        await db.Specialty.create({
          name: data.name,
          description: data.description,
          descriptionHTML: data.descriptionHTML,
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

let getAllSpecialty = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Specialty.findAll({
        attributes: {
          exclude: ["descriptionHTML", "description"],
        },
      });
      if (data && data.length > 0) {
        data.map((item) => {
          item.image = new Buffer(item.image, "base64").toString("binary");
          return item;
        });
      }
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
let getDetailSpeicalty = (idInput) => {
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
        data = await db.Specialty.findOne({
          where: {
            id: idInput,
          },
          attributes: ["descriptionHTML", "image"],
        });
        if (data) {
          arrDoctor = await db.Doctor_info.findAll({
            where: {
              specialtyId: idInput,
            },
            attributes: ["doctorId"],
          });
          if (!arrDoctor) {
            arrDoctor = {};
          }
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
  createSpecialty,
  getAllSpecialty,
  getDetailSpeicalty,
};
