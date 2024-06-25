import redbird from 'redbird';

// Create a Redbird instance with SSL support
const proxy = redbird({
    port: 80, // Listen on port 80 for HTTP traffic
    letsencrypt: {
        path: 'certs',
        port: 9999 // LetsEncrypt minimal web server port for handling challenges. Routed 80->9999, no need to open 9999 in firewall. Default 3000 if not defined.
    },
    ssl: {
        http2: true,
        port: 443, // SSL port used to serve registered https routes with LetsEncrypt certificate.
    }
});


// Register routes to forward traffic to your desired ports
proxy.register('homeluu.ddns.net', 'http://localhost:3000', {
    ssl: true,
    letsencrypt: {
        email: 'sil3nt994@gmail.com', // Domain owner/admin email

    }

});

proxy.register('homeluu.ddns.net', 'http://localhost:3001', {
    ssl: true,
    letsencrypt: {
        email: 'sil3nt994@gmail.com', // Domain owner/admin email
    },
    path: ['/addDinner', '/addIngredient', '/dinners', '/getRecipes', '/addRecipes']
});
