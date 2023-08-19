"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorController = void 0;
const DoctorService_1 = require("../services/DoctorService");
class DoctorController {
    constructor() {
        this.doctors = new Set();
    }
    registerDoc(doctorId, name, speciality) {
        const doctorService = new DoctorService_1.DoctorService();
        const doctor = doctorService.createDoctor(doctorId, name, speciality);
        this.doctors.add(doctor);
        console.log(`Welcome Dr. ${name} !!`);
        return doctor;
    }
}
exports.DoctorController = DoctorController;
