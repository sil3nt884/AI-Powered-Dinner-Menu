import redbird from 'redbird';

// Create a Redbird instance with SSL support
const proxy = redbird({
    port: 80, // Listen on port 80 for HTTP traffic
    ssl: {
        key: '/etc/letsencrypt/live/homeluu.ddns.net/privkey.pem',
        cert: '/etc/letsencrypt/live/homeluu.ddns.net/fullchain.pem',
        http2: true,
        port: 443, // SSL port used to serve registered https routes with LetsEncrypt certificate.
    }
});


// Register routes to forward traffic to your desired ports
proxy.register('homeluu.ddns.net', 'http://localhost:3000', {
    ssl: true,
});

proxy.register('homeluu.ddns.net', 'http://localhost:3001', {
    ssl: true,
    path: ['/addDinner', '/addIngredient', '/dinners', '/getRecipes', '/addRecipes']
});
