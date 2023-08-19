"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientController = void 0;
const PatientService_1 = require("../services/PatientService");
class PatientController {
    registerPatient(patientId, name) {
        const patientService = new PatientService_1.PatientService();
        const patient = patientService.createPatientObj(patientId, name);
        console.log(`${name} registered successfully`);
        return patient;
    }
}
exports.PatientController = PatientController;
