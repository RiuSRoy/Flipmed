import { BaseModel } from "./BaseModel";
import { Availability } from "./DoctorSlot";

export interface Booking extends BaseModel {
    id: string,
    doctorSlotId: string,
    userId?: string,
}

