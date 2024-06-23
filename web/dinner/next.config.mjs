/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    env: {
        ADD_RECIPE_ENDPOINT: 'http://209.38.168.236:3000/addRecipes',
        ADD_INGREDIENT_ENDPOINT: 'http://209.38.168.236:3000/addIngredient',
        DINNERS_ENDPOINT:  'http://209.38.168.236:3000/dinners',
        GET_RECIPES_ENDPOINT: 'http://209.38.168.236:3000/getRecipes',
        ADD_DINNER_ENDPOINT: 'http://209.38.168.236:3000/addDinner',
    }
};

export default nextConfig;
