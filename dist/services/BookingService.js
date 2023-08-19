"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
class BookingService {
    upsertAppointment(doctorSlot, userId) {
        doctorSlot.updatedAt = Date.now();
        doctorSlot.userId = userId;
        doctorSlot.status = "BOOKED";
        return doctorSlot;
    }
}
exports.BookingService = BookingService;
