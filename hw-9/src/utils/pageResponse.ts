import { IncomingMessage, ServerResponse } from 'http';
import fs from 'fs';
import path from 'path';
import visitLogger from './visitTracker';
import { generateRandomGradient } from './gradientUtils';
import { incrementRequestCounter, requestCounter } from './requestTracker';

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
