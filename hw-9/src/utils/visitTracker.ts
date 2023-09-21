import { formatTime, formatTimeDifference, getTimeDifference } from "./timeUtils";

const createVisitLogger = () => {
    let lastVisitTimestamp: Date | null = null;

    return {
        logVisit: () => {
            lastVisitTimestamp = new Date();
        },
        getTimeSinceLastVisit: (): string => {
            const currentDate = new Date();

            if (!lastVisitTimestamp) {
                return "First visit!";
            }

            const timeDifference = getTimeDifference(lastVisitTimestamp, currentDate);
            const lastVisitTimeFormatted = formatTime(lastVisitTimestamp);
            const timePassedFormatted = formatTimeDifference(timeDifference);

            return `Last visit was at ${lastVisitTimeFormatted}. <h3>It's been ${timePassedFormatted} since the last visit.</h3>`;
        }
    };
}

const visitLogger = createVisitLogger();

export default visitLogger;
