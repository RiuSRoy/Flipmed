import { User } from "./User";

export interface Doctor extends User {
    speciality: Speciality,
    rating: number,
    bookingsCount: number,
}



export enum Speciality {
    CARDIO = "Cardiologist",
    DERMA = "Dermatologist",
}