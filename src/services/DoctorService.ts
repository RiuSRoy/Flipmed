import { Doctor } from "../models/Doctor";
import { DoctorSlot } from "../models/DoctorSlot";
import { createDBMetaData, getRandomId } from "../utils/CommonUtils";

export class DoctorService {

    updateDoctorSlot(doctorId: string, startTime: number, endTime: number, isAvailability: boolean): DoctorSlot {
        const doctorSlot: DoctorSlot =  createDBMetaData({
            id: getRandomId(1, 1000),
            doctorId,
            startTime: startTime,
            endTime: endTime,
            status: isAvailability === true ? "AVAILABLE" : "UNAVAILABLE",
            waitList: new Set()
        });
        return doctorSlot;
    }


    createDoctor(doctorId: string,  name: string, speciality: string): Doctor {
        const doctor: Doctor =  createDBMetaData({
            id: doctorId,
            name,
            speciality,
            bookingsCount: 0
        });

        return doctor;
    }
}