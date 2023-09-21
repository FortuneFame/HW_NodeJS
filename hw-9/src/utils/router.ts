import { IncomingMessage, ServerResponse } from 'http';
import fs from 'fs';
import path from 'path';

export const sendHtmlPage = (req: IncomingMessage, filePath: string, res: ServerResponse, statusCode: number = 200) => {
    const fullPath = path.join(process.cwd(), 'src', filePath);
    fs.readFile(fullPath, (err, data) => {
        if (err) {
            sendStaticFile(req.url!, res);
            return;
        }
        res.writeHead(statusCode, { 'Content-Type': 'text/html' });
        res.end(data);
    });
}

export const sendStaticFile = (url: string, res: ServerResponse) => {
    const extension = path.extname(url);
    let contentType = 'text/html';

    switch (extension) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.gif':
            contentType = 'image/gif';
            break;
        default:
            contentType = 'text/html';
    }

    const filePath = path.join(process.cwd(), 'src', url);
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404);
            res.end("Not Found");
            return;
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
    });
}
