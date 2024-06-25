/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    env: {
        ADD_RECIPE_ENDPOINT: 'http://localhost:3000/addRecipes',
        ADD_INGREDIENT_ENDPOINT: 'https://homeluu.ddns.net:3000/addIngredient',
        DINNERS_ENDPOINT:  'https://homeluu.ddns.net:3000/dinners',
        GET_RECIPES_ENDPOINT: 'https://homeluu.ddns.net:3000/getRecipes',
        ADD_DINNER_ENDPOINT: 'https://homeluu.ddns.net:3000/addDinner',
    }
};

export default nextConfig;
