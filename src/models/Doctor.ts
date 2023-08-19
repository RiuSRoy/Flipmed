import { User } from "./User";

export interface Doctor extends User {
    speciality: Speciality,
    rating: number,
}



export enum Speciality {
    CARDIO = "Cardiologist",
    DERMA = "Dermatologist",
}