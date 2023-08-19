import { Doctor } from "../models/Doctor";
import { DoctorService } from "../services/DoctorService"

export class DoctorController {

    doctors: Set<Doctor> = new Set();

    registerDoc(doctorId: string, name: string, speciality: string) {
        const doctorService = new DoctorService();
        const doctor: Doctor = doctorService.createDoctor(doctorId, name, speciality);
        this.doctors.add(doctor);
        console.log(`Welcome Dr. ${name} !!`);
        return doctor;
    }
}