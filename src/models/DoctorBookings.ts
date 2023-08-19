import { BaseModel } from "./BaseModel";

export interface DoctorBookings extends BaseModel {
    id: string,
    doctorId: string,
    bookingsCount: number
}
