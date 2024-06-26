/** @type {import('next').NextConfig} */
const nextConfig = {
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
        DINNERS_ENDPOINT:  'http://localhost:4000/dinners',
        GET_RECIPES_ENDPOINT: 'http://localhost:4000/getRecipes',
        ADD_DINNER_ENDPOINT: 'https://homeluu.ddns.net/addDinner',
    }
};

export default nextConfig;
