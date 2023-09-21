export const getTimeDifference = (start: Date, end: Date) => {
    let diff = (end.getTime() - start.getTime()) / 1000; 

    const hours = Math.floor(diff / 3600);
    diff %= 3600;

    const minutes = Math.floor(diff / 60);
    diff %= 60;

    const seconds = Math.floor(diff);

    return { hours, minutes, seconds };
}

export const formatTime = (date: Date): string => {
    return [date.getHours(), date.getMinutes(), date.getSeconds()]
        .map(unit => unit.toString().padStart(2, '0'))
        .join(':');
}

export const formatTimeDifference = (diff: { hours: number, minutes: number, seconds: number }): string => {
    return [diff.hours, diff.minutes, diff.seconds]
        .map(unit => unit.toString().padStart(2, '0'))
        .join(':');
}
