"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientService = void 0;
const CommonUtils_1 = require("../utils/CommonUtils");
class PatientService {
    createPatientObj(patientId, name) {
        const patient = (0, CommonUtils_1.createDBMetaData)({
            id: patientId,
            name
        });
        return patient;
    }
}
exports.PatientService = PatientService;
