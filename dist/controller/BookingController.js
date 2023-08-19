"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingController = void 0;
const BookingService_1 = require("../services/BookingService");
const DoctorService_1 = require("../services/DoctorService");
const CommonUtils_1 = require("../utils/CommonUtils");
class BookingController {
    constructor() {
        this.doctorSlots = new Set();
    }
    markDocAvail(doctor, slots, isAvailable) {
        slots.forEach(slot => {
            const startEpoch = (0, CommonUtils_1.convertClockTimeToEpoch)(slot.startTime);
            const endEpoch = (0, CommonUtils_1.convertClockTimeToEpoch)(slot.endTime);
            if (endEpoch - startEpoch != 1800000) {
                console.error(`Sorry ${doctor.name}, slots are 30 mins only`);
                return;
            }
            // if (startEpoch < Date.now()) {
            //     console.error("This Slot is already history!");
            //     return
            // }
            const doctorService = new DoctorService_1.DoctorService();
            const update = doctorService.updateDoctorSlot(doctor.id, startEpoch, endEpoch, isAvailable);
            this.doctorSlots.add(update);
        });
        console.log("Done Doc!");
    }
    showAvailByspeciality(docs, speciality) {
        const doctorIds = docs.filter(doctor => doctor.speciality === speciality).sort((a, b) => b.rating - a.rating).map(doctor => doctor.id);
        const availableSlots = [];
        Array.from(this.doctorSlots).filter(slot => doctorIds.includes(slot.doctorId) && slot.status === "AVAILABLE").sort((a, b) => a.startTime - b.startTime).forEach(slot => {
            availableSlots.push({ doctorId: slot.doctorId, startTime: slot.startTime, endTime: slot.endTime });
            const doctor = docs.find(doctor => doctor.id === slot.doctorId);
            console.log(`[${speciality}] Doctor ${doctor.name} is available between ${(0, CommonUtils_1.convertEpochToReadableTime)(slot.startTime)}-${(0, CommonUtils_1.convertEpochToReadableTime)(slot.endTime)}`);
        });
        if (availableSlots.length == 0) {
            console.log("No slots avaiable");
        }
        return availableSlots;
    }
    bookAppointment(user, doctor, startTime) {
        const startEpoch = (0, CommonUtils_1.convertClockTimeToEpoch)(startTime);
        // if (startEpoch < Date.now()) {
        //     console.error("This Slot is already history!");
        //     return
        // }
        const userSlot = Array.from(this.doctorSlots).find(slot => slot.startTime == startEpoch && slot.userId == user.id);
        if (userSlot && userSlot.status == "BOOKED") {
            console.error(`patient ${user.id} already has a booking at this hour with doctor -> ${userSlot.doctorId}`);
            return;
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
        const bookingService = new BookingService_1.BookingService();
        const booking = bookingService.upsertAppointment(doctorSlot, user.id);
        this.doctorSlots.add(booking);
        doctor.bookingsCount++;
        console.log(`Booking Created:- ${booking.id}\nPatient: ${user.name} <-> Doctor: ${doctor.name} from ${startTime}`);
        return booking.id;
    }
    cancelAppointment(bookingId) {
        if (!bookingId) {
            console.log("No such bookingId");
            return;
        }
        this.doctorSlots.forEach(slot => {
        });
        for (const slot of this.doctorSlots) {
            if (slot.id === bookingId) {
                this.doctorSlots.delete(slot);
                slot.updatedAt = Date.now();
                slot.status = "AVAILABLE";
                slot.userId = undefined;
                this.doctorSlots.add(slot);
                console.log("Booking Cancelled: " + bookingId);
                if (slot.waitList.size > 0) {
                    const waitListArray = [...slot.waitList];
                    const userId = waitListArray.shift();
                    slot.status = "BOOKED";
                    slot.userId = userId;
                    slot.waitList = new Set(waitListArray);
                    console.log(`Booking Confirmed for patientId: ${userId}, BookingId: ${bookingId}`);
                }
                return;
            }
        }
    }
    viewPatientBookings(user) {
        console.log("Bookings of " + user.name + ":");
        const startDay = (0, CommonUtils_1.getStartOfDay)(), endDay = (0, CommonUtils_1.getEndOfDay)();
        const bookings = Array.from(this.doctorSlots).filter(slot => slot.userId === user.id && slot.startTime >= startDay && slot.endTime <= endDay && slot.status === "BOOKED");
        console.log(bookings);
    }
    viewDoctorBookings(doctor) {
        console.log("Bookings of " + doctor.name + ":");
        const startDay = (0, CommonUtils_1.getStartOfDay)(), endDay = (0, CommonUtils_1.getEndOfDay)();
        const bookings = Array.from(this.doctorSlots).filter(slot => slot.doctorId === doctor.id && slot.startTime >= startDay && slot.endTime <= endDay && slot.status === "BOOKED");
        console.log(bookings);
    }
    getMostTrendingDoctor(docs) {
        const mostTrendingDoctor = docs.sort((a, b) => b.bookingsCount - a.bookingsCount)[0];
        console.log(`Most trending doctor: ${mostTrendingDoctor.id} with Bookings: ${mostTrendingDoctor.bookingsCount}`);
    }
}
exports.BookingController = BookingController;
