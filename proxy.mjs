import redbird from 'redbird';

// Create a Redbird instance with SSL support
const proxy = redbird({
    port: 80, // Listen on port 80 for HTTP traffic
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
    path: ['/addDinner', '/addIngredient', '/dinners', '/getRecipes', '/addRecipes']
});
