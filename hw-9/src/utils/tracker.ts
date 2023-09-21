import { IncomingMessage, ServerResponse } from 'http';
import fs from 'fs';
import path from 'path';
import { generateRandomGradient } from './gradientGenerator';
import { incrementRequestCounter, requestCounter } from './gradientTracker';

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

const getTimeDifference = (start: Date, end: Date) => {
    let diff = (end.getTime() - start.getTime()) / 1000; 

    const hours = Math.floor(diff / 3600);
    diff %= 3600;

    const minutes = Math.floor(diff / 60);
    diff %= 60;

    const seconds = Math.floor(diff);

    return { hours, minutes, seconds };
}

const formatTime = (date: Date): string => {
    return [date.getHours(), date.getMinutes(), date.getSeconds()]
        .map(unit => unit.toString().padStart(2, '0'))
        .join(':');
}

const formatTimeDifference = (diff: { hours: number, minutes: number, seconds: number }): string => {
    return [diff.hours, diff.minutes, diff.seconds]
        .map(unit => unit.toString().padStart(2, '0'))
        .join(':');
}

const visitLogger = createVisitLogger();

export const sendHtmlPageWithTime = (req: IncomingMessage, filePath: string, res: ServerResponse, statusCode: number = 200) => {
    incrementRequestCounter();
    
    const fullPath = path.join(process.cwd(), "src", filePath);
    fs.readFile(fullPath, (err, dataBuffer) => {
        if (err) {
            res.writeHead(404);
            res.end("File not found");
            return;
        }

        let responseData = dataBuffer.toString();

        const timeInfo = visitLogger.getTimeSinceLastVisit();
        responseData = responseData.replace("<!--TIME-->", `<p id="timeSinceLast">${timeInfo}</p>`);
        visitLogger.logVisit();

        const gradient = generateRandomGradient();
        const gradientStyle = `background: linear-gradient(${gradient.angle}deg, ${gradient.color1}, ${gradient.color2});`;
        responseData = responseData.replace('<!--GRADIENT-->', `<div  class="gradient" style="${gradientStyle}" id="gradient-background"></div>`);
        responseData = responseData.replace('<!--REQUEST_COUNT-->', `Number of requests processed: ${requestCounter}`);

        res.writeHead(statusCode, { 'Content-Type': 'text/html' });
        res.end(responseData);
    });
}
