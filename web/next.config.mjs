import  withPWAInit   from "@ducanh2912/next-pwa"

const withPWA = withPWAInit({
   dest: "public",
    register: true,
    customWorkerDir: 'src/service-worker',
    customWorkerSrc: 'service-worker.js',

});


/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
    poweredByHeader: false,
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    env: {
        ADD_RECIPE_ENDPOINT: 'https://homeluu.ddns.net/addRecipes',
        ADD_INGREDIENT_ENDPOINT: 'https://homeluu.ddns.net/addIngredient',
        DINNERS_ENDPOINT:  'http://localhost:8000/dinners',
        GET_RECIPES_ENDPOINT: 'http://localhost:8000/getRecipes',
        ADD_DINNER_ENDPOINT: 'https://homeluu.ddns.net/addDinner',
    }
});

export default nextConfig;
