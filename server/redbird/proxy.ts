import proxy from 'redbird';

const proxy = redbird({
    port: 80, // Listen on port 80 for HTTP traffic
    ssl: {
        port: 443, // Listen on port 443 for HTTPS traffic
        letsencrypt: {
            email: 'john@example.com', // Domain owner/admin email
        }
    }
});

// Register routes to forward traffic to your desired ports
proxy.register('homeluu.ddns.net', 'http://localhost:3000', {
    ssl: true
});

proxy.register('homeluu.ddns.net', 'http://localhost:3001', {
    ssl: true
});
