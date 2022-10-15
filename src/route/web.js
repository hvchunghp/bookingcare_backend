import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
import patientController from "../controllers/patientController";
import specialtyController from "../controllers/specialtyController";
import clinicController from "../controllers/clinicController";
let router = express.Router();

let initWebRoutes = (app) => {
  // router.get("/", homeController.getHomePage);
  // router.get("/about", homeController.getAboutPage);
  // router.get("/add", homeController.getCRUD);

  // router.post("/post-crud", homeController.postCRUD);
  // router.get("/user", homeController.displayGetCRUD);
  // router.get("/edit", homeController.getEditCRUD);

  // router.post("/put-crud", homeController.putCRUD);
  // router.get("/delete", homeController.deleteCRUD);

  router.post("/login", userController.handleLogin);
  router.get("/users", userController.handleGetAllUsers);
  router.post("/create-new-user", userController.handleCreateNewUser);
  router.put("/edit-user", userController.handleEditUser);
  router.delete("/delete-user", userController.handleDeleteUser);
  router.get("/allcode", userController.getAllCode);
  router.get("/doctor", doctorController.getDoctors);
  router.get("/get-all-doctors", doctorController.getAllDoctors);
  router.post("/info-doctors", doctorController.postInfoDoctors);
  router.get("/get-details-doctors", doctorController.getDetailsDoctors);
  router.post("/bulk-create-schedules", doctorController.bulkCreateSchedules);
  router.get("/get-schedule-by-date", doctorController.getScheduleByDate);
  router.get("/get-extra-info-by-id", doctorController.getExtraInfoById);
  router.get(
    "/get-profile-doctor-by-id",
    doctorController.getProfileDoctorById
  );
  router.post(
    "/patient-book-appointment",
    patientController.patientBookAppointment
  );
  router.post("/verify-booking", patientController.verifyBooking);
  router.post("/create-specialty", specialtyController.createSpecialty);
  router.get("/get-all-specialty", specialtyController.getAllSpecialty);
  router.get("/get-detail-specialty", specialtyController.getDetailSpeicalty);
  router.post("/create-clinic", clinicController.createClinic);
  router.get("/get-all-clinic", clinicController.getAllClinic);
  router.get("/get-detail-clinic", clinicController.getDetailClinic);
  router.get("/get-patient-booking", doctorController.getPatientBooking);
  router.put("/update-status-booking", doctorController.updateStatusBooking);

  return app.use("/api", router);
};

module.exports = initWebRoutes;
