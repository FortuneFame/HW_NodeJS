import { IncomingMessage, ServerResponse } from 'http';
import { sendHtmlPage, sendStaticFile } from '../utils/router';
import { sendHtmlPageWithTime } from '../utils/tracker';

export const handleRequest = (req: IncomingMessage, res: ServerResponse): void => {
    const routeHandlers: Record<string, (req: IncomingMessage, res: ServerResponse) => void> = {
        '/': (req, res) => {
            sendHtmlPageWithTime(req, 'pages/index.html', res);
        },
        '/library': (req, res) => sendHtmlPage(req, 'pages/library.html', res),
        '/404': (req, res) => sendHtmlPage(req, 'pages/404.html', res, 404)
    };

    const handler = routeHandlers[req.url || '/'] || ((req, res) => {
        if (req.url!.endsWith('.css') || req.url!.endsWith('.gif')) {
            sendStaticFile(req.url!, res);
        } else {
            sendHtmlPage(req, 'pages/404.html', res, 404);
        }
    });

    handler(req, res);
};
