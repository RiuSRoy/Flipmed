// https://docs.google.com/document/d/e/2PACX-1vSbAgRng_p5UOJVuTraFgvLRE9YtELDZXrMQbcUslIBLLvK7yEq5ncKIRC7Zz1hk5PzGA-F_suQMYcn/pub

import { BookingController } from "./controller/BookingController";
import { DoctorController } from "./controller/DoctorController";
import { PatientController } from "./controller/PatientController";
import { Doctor, Speciality } from "./models/Doctor";
import { DoctorService } from "./services/DoctorService";

const docs = new Set<Doctor>();
const doctorController = new DoctorController();
const docCurious = doctorController.registerDoc("1", "curious", Speciality.CARDIO);
docs.add(docCurious);
console.log("\n");

const bookingController = new BookingController();
bookingController.markDocAvail(docCurious, [{startTime: "9:30", endTime: "10:30"}], true);
console.log("\n");
bookingController.markDocAvail(docCurious, [
    {startTime: "9:30", endTime: "10:00"},
    {startTime: "12:30", endTime: "13:00"},
    {startTime: "16:00", endTime: "16:30"}
], true);
console.log("\n");

const docDreadful = doctorController.registerDoc("2", "Dreadful", Speciality.DERMA);
docs.add(docDreadful);
bookingController.markDocAvail(docDreadful, [
    {startTime: "9:30", endTime: "10:00"},
    {startTime: "12:30", endTime: "13:00"},
    {startTime: "16:00", endTime: "16:30"}
], true);
console.log("\n");
bookingController.showAvailByspeciality(Array.from(docs), Speciality.CARDIO);
console.log("\n");

const patientController = new PatientController();
const patientA = patientController.registerPatient("A", "PatientA");
console.log("\n");

const bookingId1 = bookingController.bookAppointment(patientA, docCurious, "12:30");
console.log("\n");
bookingController.showAvailByspeciality(Array.from(docs), Speciality.CARDIO);
console.log("\n");
bookingController.cancelAppointment(bookingId1);
console.log("\n");
bookingController.showAvailByspeciality(Array.from(docs), Speciality.CARDIO);
console.log("\n");

const patientB = patientController.registerPatient("B", "PatientB");
console.log("\n");
const bookingId2 = bookingController.bookAppointment(patientB, docCurious, "12:30");
console.log("\n");

const docDaring = doctorController.registerDoc("3", "Daring", Speciality.DERMA);
docs.add(docDaring);
console.log("\n");
bookingController.markDocAvail(docDaring, [
    {startTime: "11:30", endTime: "12:00"},
    {startTime: "14:00", endTime: "14:30"},
], true);
console.log("\n");

bookingController.showAvailByspeciality(Array.from(docs), Speciality.DERMA);
console.log("\n");

const patientF = patientController.registerPatient("F", "PatientF");
console.log("\n");
const bookingId3 = bookingController.bookAppointment(patientF, docDaring, "11:30");
console.log("\n");

const bookingId4 = bookingController.bookAppointment(patientA, docCurious, "12:30");
console.log("\n");
bookingController.viewDoctorBookings(docCurious);
console.log("\n");
const bookingId5 = bookingController.bookAppointment(patientF, docCurious, "9:30");
console.log("\n");
const patientC = patientController.registerPatient("C", "PatientC");
console.log("\n");
const bookingId6 = bookingController.bookAppointment(patientC, docCurious, "16:00");
console.log("\n");

bookingController.showAvailByspeciality(Array.from(docs), Speciality.CARDIO);
console.log("\n");


const patientD = patientController.registerPatient("D", "PatientD");
console.log("\n");
const bookingId7 = bookingController.bookAppointment(patientD, docCurious, "16:00");
console.log("\n");

bookingController.cancelAppointment(bookingId6);
console.log("\n");
bookingController.viewPatientBookings(patientF);
console.log("\n");
bookingController.viewPatientBookings(patientD);
console.log("\n");
bookingController.bookAppointment(patientF, docCurious, "9:30");
console.log("\n");

bookingController.getMostTrendingDoctor(Array.from(docs));

