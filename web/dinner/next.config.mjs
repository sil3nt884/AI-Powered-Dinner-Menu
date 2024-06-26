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
        DINNERS_ENDPOINT:  'https://homeluu.ddns.net/dinners',
        GET_RECIPES_ENDPOINT: 'https://homeluu.ddns.net/getRecipes',
        ADD_DINNER_ENDPOINT: 'https://homeluu.ddns.net/addDinner',
    }
};

export default nextConfig;
