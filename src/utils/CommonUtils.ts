export function createDBMetaData(obj: any) {
    obj.createdAt = Date.now();
    obj.updatedAt = Date.now();
    return obj;
}


export function getStartOfDay() {
    const startOfDay = new Date();
    startOfDay.setHours(9, 0, 0, 0);

    return startOfDay.getTime();
}

export function getEndOfDay() {
    const startOfDay = new Date();
    startOfDay.setHours(21, 0, 0, 0);

    return startOfDay.getTime();
}

export function convertClockTimeToEpoch(startTime: string) {
    const start = new Date();
    const [hour, min] = startTime.split(':');
    start.setHours(parseFloat(hour), parseFloat(min), 0, 0);
    return start.getTime();
}


export function convertEpochToReadableTime(epoch: number) {
    const date = new Date(epoch);
    return date.getHours() + ":" + date.getMinutes();
}


export function getRandomId(min: number, max: number) {
    const x = Math.floor(Math.random() * (max - min + 1)) + min;
    return x;
}