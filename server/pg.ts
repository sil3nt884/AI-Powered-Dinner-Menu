import { Client } from 'pg';

export const client = new Client({
    user:  process.env.PGUSER ?? '',
    host: process.env.PGHOST ?? '',
    database: 'menus',
    password: process.env.PGPASSWORD ?? '',
    port: parseInt(process.env.PGPORT ?? ''),
});

export const connect = async () => {
    try {
        await client.connect();
    }
    catch (e) {
        console.error(e);
    }

}

export const disconnect = async () => {
    try {
        await client.end();
    }
    catch (e) {
        console.error(e);
    }
}


