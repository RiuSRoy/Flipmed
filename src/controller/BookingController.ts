import { Doctor } from "../models/Doctor";
import { DoctorBookings } from "../models/DoctorBookings";
import { DoctorSlot } from "../models/DoctorSlot";
import { Patient } from "../models/Patient";
import { BookingService } from "../services/BookingService";
import { DoctorService } from "../services/DoctorService"
import { convertClockTimeToEpoch, convertEpochToReadableTime, getEndOfDay, getStartOfDay } from "../utils/CommonUtils";

export class BookingController {

    doctorSlots: Set<DoctorSlot> = new Set();    

    markDocAvail(doctor: Doctor, slots: { startTime: string, endTime: string }[], isAvailable: boolean): void{
        slots.forEach(slot => {
            const startEpoch = convertClockTimeToEpoch(slot.startTime);
            const endEpoch = convertClockTimeToEpoch(slot.endTime);
            if (endEpoch - startEpoch != 1800000) {
                console.error(`Sorry ${doctor.name}, slots are 30 mins only`)
                return
            }
            // if (startEpoch < Date.now()) {
            //     console.error("This Slot is already history!");
            //     return
            // }
            const doctorService = new DoctorService();
            const update = doctorService.updateDoctorSlot(doctor.id, startEpoch, endEpoch, isAvailable);
    
            this.doctorSlots.add(update);
        })
        console.log("Done Doc!")
    }
    

    showAvailByspeciality(docs: Doctor[], speciality: string) {
        const doctorIds = docs.filter(doctor => doctor.speciality === speciality).sort((a, b) => b.rating - a.rating).map(doctor => doctor.id);
        const availableSlots: any[] = [];
        Array.from(this.doctorSlots).filter(slot => doctorIds.includes(slot.doctorId) && slot.status === "AVAILABLE").sort((a,b) => a.startTime - b.startTime).forEach(slot => {
            availableSlots.push({ doctorId: slot.doctorId, startTime: slot.startTime, endTime: slot.endTime });
            const doctor = docs.find(doctor => doctor.id === slot.doctorId);
            console.log(`[${speciality}] Doctor ${doctor!.name} is available between ${convertEpochToReadableTime(slot.startTime)}-${convertEpochToReadableTime(slot.endTime)}`)
        });
        if (availableSlots.length == 0) {
            console.log("No slots avaiable");
        }
        return availableSlots;
    }

    bookAppointment(user: Patient, doctor: Doctor, startTime: string) {
        const startEpoch = convertClockTimeToEpoch(startTime);
        // if (startEpoch < Date.now()) {
        //     console.error("This Slot is already history!");
        //     return
        // }

        const userSlot = Array.from(this.doctorSlots).find(slot => slot.startTime == startEpoch && slot.userId == user.id);
        if (userSlot && userSlot.status == "BOOKED") {
            console.error(`patient ${user.id} already has a booking at this hour with doctor -> ${userSlot.doctorId}`);
            return
        }

        // check doctor slot if available
        const doctorSlot = Array.from(this.doctorSlots).find(slot => slot.doctorId == doctor.id && slot.startTime == startEpoch);
        if (!doctorSlot || ["UNAVAILABLE"].includes(doctorSlot.status)) {
            console.error("slot of this doctor is not available for booking!");
            return;
        }
        if (doctorSlot.status === "BOOKED") {
            doctorSlot.waitList.add(user.id);
            console.log(`userId ${user.name} added to the waitlist`);
            return;
        }

        const bookingService = new BookingService();
        const booking = bookingService.upsertAppointment(doctorSlot, user.id);
        this.doctorSlots.add(booking);
        doctor.bookingsCount++;

        console.log(`Booking Created:- ${booking.id}\nPatient: ${user.name} <-> Doctor: ${doctor.name} from ${startTime}`)
        return booking.id;
    }

    cancelAppointment(bookingId?: string) {
        if (!bookingId) {
            console.log("No such bookingId");
            return;
        }
        for (const slot of this.doctorSlots) {
            if (slot.id === bookingId) {
                this.doctorSlots.delete(slot);
                slot.updatedAt = Date.now();
                slot.status = "AVAILABLE";
                slot.userId = undefined;
                this.doctorSlots.add(slot);
                
                console.log("Booking Cancelled: " + bookingId)
                if (slot.waitList.size > 0) {
                    const waitListArray = [...slot.waitList];
                    const userId = waitListArray.shift();
                    slot.status = "BOOKED";
                    slot.userId = userId;
                    slot.waitList = new Set(waitListArray);
                    console.log(`Booking Confirmed for patientId: ${userId}, BookingId: ${bookingId}`)
                }
                return;
            }
        }
    }   

    viewPatientBookings(user: Patient) {
        console.log("Bookings of " + user.name + ":")
        const startDay = getStartOfDay(), endDay = getEndOfDay();
        const bookings = Array.from(this.doctorSlots).filter(slot => slot.userId === user.id && slot.startTime >= startDay && slot.endTime <= endDay && slot.status === "BOOKED");
        console.log(bookings)
    }


    viewDoctorBookings(doctor: Doctor) {
        console.log("Bookings of " + doctor.name + ":")
        const startDay = getStartOfDay(), endDay = getEndOfDay();
        const bookings = Array.from(this.doctorSlots).filter(slot => slot.doctorId === doctor.id && slot.startTime >= startDay && slot.endTime <= endDay && slot.status === "BOOKED");
        console.log(bookings)
    }

    getMostTrendingDoctor(docs: Doctor[]) {
        const mostTrendingDoctor = docs.sort((a, b) => b.bookingsCount - a.bookingsCount)[0];

        console.log(`Most trending doctor: ${mostTrendingDoctor.id} with Bookings: ${mostTrendingDoctor.bookingsCount}`);
    }
}