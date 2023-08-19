"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorService = void 0;
const CommonUtils_1 = require("../utils/CommonUtils");
class DoctorService {
    updateDoctorSlot(doctorId, startTime, endTime, isAvailability) {
        const doctorSlot = (0, CommonUtils_1.createDBMetaData)({
            id: (0, CommonUtils_1.getRandomId)(1, 1000),
            doctorId,
            startTime: startTime,
            endTime: endTime,
            status: isAvailability === true ? "AVAILABLE" : "UNAVAILABLE",
            waitList: new Set()
        });
        return doctorSlot;
    }
    createDoctor(doctorId, name, speciality) {
        const doctor = (0, CommonUtils_1.createDBMetaData)({
            id: doctorId,
            name,
            speciality,
            bookingsCount: 0
        });
        return doctor;
    }
}
exports.DoctorService = DoctorService;
