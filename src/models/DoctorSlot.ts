import { BaseModel } from "./BaseModel";

export interface DoctorSlot extends BaseModel {
    id: string,
    status: Availability,
    startTime: number,
    endTime: number,
    userId?: string,
    doctorId: string,
    waitList: Set<string>
}

export type Availability = "AVAILABLE" | "UNAVAILABLE" | "BOOKED";