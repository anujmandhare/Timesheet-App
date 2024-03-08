const express = require('express');
export const router = express.Router();

const UserController = require("../controller/UserController");
const TimesheetController = require("../controller/TimesheetController");
const AssignmentsController = require("../controller/AssignmentsController");
const { authenticateJWT } = require('../extras/authenticateToken');

router.post("/login", UserController.login);
// router.post('/register', UserController.register);

// router.get('/verify/*', userVerification);
// router.use(authenticateJWT);

// router.post('/onlineOrder', OrderController.onlineOrder);
// router.post('/update', UserController.update);

// router.use(authenticateJWT);

// router.post("/addTimesheet", TimesheetController.addTimesheet);
router.put("/updateTimesheet", TimesheetController.updateTimesheet);
router.get("/getTimesheet", TimesheetController.getTimesheet);
router.get("/generateMissingTimesheets", TimesheetController.generateMissingTimesheets);

router.get("/getAssignments", AssignmentsController.getAssignments);
router.get("/getDates", AssignmentsController.getDates);
