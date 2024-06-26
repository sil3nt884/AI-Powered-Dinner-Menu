import { Request, Response } from "express";

const SECERT_HEADER = process.env.SECRET_HEADER ?? undefined
export const allowedIpAddress = () => (req: Request, res: Response, next: () => void) => {

    if(!SECERT_HEADER){
        res.status(403).send('Forbidden');
        return;
    }

    if (!req.header(SECERT_HEADER)) {
        res.status(403).send('Forbidden');
        return;
    }

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

    if(req.socket.remoteAddress.includes('127.0.0.1') || req.socket.remoteAddress.includes('::1')){
        next();
        return;
    }

    console.log("Forbidden",forwardedIpsStr )
   res.status(403).send('Forbidden');
}
