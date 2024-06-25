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
    const forwardedIpsStr = req.header('X-Real-IP')?.replace(/[^0-9.]/g, '');
    console.log("request id", forwardedIpsStr)
    if (allowedIps.includes(forwardedIpsStr)) {
        next();
        return;
    }
    console.log("Forbidden",forwardedIpsStr )
   res.status(403).send('Forbidden');
}
