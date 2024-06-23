import { Client } from 'pg';

export const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'menus',
    password: 'password',
    port: 5433,
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


