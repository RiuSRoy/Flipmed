import { Patient } from "../models/Patient";
import { createDBMetaData } from "../utils/CommonUtils";

export class PatientService {

    createPatientObj(patientId: string, name: string): Patient{
        const patient = createDBMetaData({
            id: patientId,
            name
        });
        return patient;
    }
}