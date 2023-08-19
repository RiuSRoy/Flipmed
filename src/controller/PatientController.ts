import { PatientService } from "../services/PatientService";

export class PatientController {
    registerPatient(patientId: string, name: string) {
        const patientService = new PatientService();
        const patient = patientService.createPatientObj(patientId, name);
        console.log(`${name} registered successfully`);
        return patient;
    }
}