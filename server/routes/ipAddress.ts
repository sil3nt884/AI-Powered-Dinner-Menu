import { Request, Response } from "express";
import * as jose from 'jose'
const SECERT_HEADER = process.env.SECRET_HEADER ?? undefined
const jwtKey = process.env.JWT_KEY ?? undefined
import {  createSecretKey } from 'crypto';
export const allowedIpAddress = () => async (req: Request, res: Response, next: () => void) => {

    const clientCertEncoded = req.header('jwt');
    if(!clientCertEncoded){
        return res.status(403).send('Forbidden');

    }
    if(!jwtKey){
        return res.status(403).send('Forbidden');
    }

    const secret =  createSecretKey(Buffer.from(jwtKey, 'utf8'));
    const jwt = await jose.jwtDecrypt(clientCertEncoded, secret, {
        issuer: 'homeluu',
    })

    if(!jwt){
        return res.status(403).send('Forbidden');
    }

    if(!SECERT_HEADER){
        return res.status(403).send('Forbidden');
    }

    if ( SECERT_HEADER && !req.header(SECERT_HEADER)) {
        return res.status(403).send('Forbidden');
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
    if(forwardedIpsStr && !allowedIps.includes(forwardedIpsStr)){
        return res.status(403).send('Forbidden');
    }
    else {
        if(req.socket.remoteAddress?.includes('127.0.0.1') || req.socket.remoteAddress?.includes('::1')){
            return next();
        }
        return next()
    }
}
