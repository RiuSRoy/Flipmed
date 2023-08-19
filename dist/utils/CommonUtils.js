"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomId = exports.convertEpochToReadableTime = exports.convertClockTimeToEpoch = exports.getEndOfDay = exports.getStartOfDay = exports.createDBMetaData = void 0;
function createDBMetaData(obj) {
    obj.createdAt = Date.now();
    obj.updatedAt = Date.now();
    return obj;
}
exports.createDBMetaData = createDBMetaData;
function getStartOfDay() {
    const startOfDay = new Date();
    startOfDay.setHours(9, 0, 0, 0);
    return startOfDay.getTime();
}
exports.getStartOfDay = getStartOfDay;
function getEndOfDay() {
    const startOfDay = new Date();
    startOfDay.setHours(21, 0, 0, 0);
    return startOfDay.getTime();
}
exports.getEndOfDay = getEndOfDay;
function convertClockTimeToEpoch(startTime) {
    const start = new Date();
    const [hour, min] = startTime.split(':');
    start.setHours(parseFloat(hour), parseFloat(min), 0, 0);
    return start.getTime();
}
exports.convertClockTimeToEpoch = convertClockTimeToEpoch;
function convertEpochToReadableTime(epoch) {
    const date = new Date(epoch);
    return date.getHours() + ":" + date.getMinutes();
}
exports.convertEpochToReadableTime = convertEpochToReadableTime;
function getRandomId(min, max) {
    const x = Math.floor(Math.random() * (max - min + 1)) + min;
    return x;
}
exports.getRandomId = getRandomId;
