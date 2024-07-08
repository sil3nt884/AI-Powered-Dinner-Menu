import fs from 'fs';

const privateKey = fs.readFileSync('private.key', 'utf8');
const publicKey = fs.readFileSync('public.key', 'utf8');
export const keys ={
    pulbic: publicKey.trim(),
    private: privateKey.trim()
}

