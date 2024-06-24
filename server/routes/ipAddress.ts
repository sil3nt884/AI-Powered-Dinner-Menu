import { Request, Response } from "express";
export const allowedIpAddress = () => (req: Request, res: Response, next: () => void) => {
    const allowedIps = [
        '88.97.10.194',
        '::1',
        '127.0.0.1',
        '139.59.168.154',
        '209.38.168.236'
    ]

    if (allowedIps.includes(req.ip)) {
        return next();
    }
   res.status(403).send('Forbidden');
}
