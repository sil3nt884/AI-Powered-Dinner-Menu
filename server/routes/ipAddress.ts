import { Request, Response } from "express";
export const allowedIpAddress = () => (req: Request, res: Response, next: () => void) => {
    const allowedIps = [
        '88.97.10.194',
        '::1',
        '127.0.0.1',
        '139.59.168.154',
        '209.38.168.236'
    ]
    const forwardedIpsStr = req.header('x-forwarded-for');
    const remoteAddress = req.socket.remoteAddress;

    if (allowedIps.includes(remoteAddress) || allowedIps.includes(forwardedIpsStr)) {
        return next();
    }
   res.status(403).send('Forbidden');
}
