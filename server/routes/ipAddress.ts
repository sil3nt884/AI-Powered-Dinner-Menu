import { Request, Response } from "express";
export const allowedIpAddress = () => (req: Request, res: Response, next: () => void) => {
    const allowedIps = [
        '88.97.10.194',
        '::1',
        '127.0.0.1',
        '139.59.168.154',
        '209.38.168.236',
        '10.16.0.2'
    ]
    const forwardedIpsStr = req.header('x-forwarded-for')?.replace(/[^0-9.]/g, '');
    const remoteAddress = req.socket.remoteAddress?.replace(/[^0-9.]/g, '');
    console.log("request id", forwardedIpsStr, remoteAddress)
    if (allowedIps.includes(forwardedIpsStr) || allowedIps.includes(remoteAddress)) {
        next();
        return;
    }
   res.status(403).send('Forbidden');
}
