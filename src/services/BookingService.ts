import { Doctor } from "../models/Doctor";
import { DoctorSlot } from "../models/DoctorSlot";
import { createDBMetaData, getRandomId } from "../utils/CommonUtils";

export class BookingService {

    upsertAppointment(doctorSlot: DoctorSlot, userId: string): DoctorSlot {
        doctorSlot.updatedAt = Date.now();
        doctorSlot.userId = userId;
        doctorSlot.status = "BOOKED";
        return doctorSlot;
    }
}