import redbird from 'redbird';

// Create a Redbird instance with SSL support
const proxy = redbird({
    port: 80, // Listen on port 80 for HTTP traffic
    ssl: {
        port: 443, // Listen on port 443 for HTTPS traffic
        key: '/path/to/your/ssl-key.pem', // Path to your SSL key
        cert: '/path/to/your/ssl-cert.pem' // Path to your SSL certificate
    }
});

// Register routes to forward traffic to your desired ports
proxy.register('homeluu.ddns.net', 'http://localhost:3000', {
    ssl: true
});

proxy.register('homeluu.ddns.net', 'http://localhost:3001', {
    ssl: true,
    path: ['/addDinner', '/addIngredient', '/dinners', '/getRecipes', '/addRecipes']
});
