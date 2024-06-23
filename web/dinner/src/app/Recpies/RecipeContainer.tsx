import RecipeCard from "@/app/Recpies/RecpieCard";
import {RecipeData} from "../../../../../server/routes/getRecipes";
import './Recpies.css'

export default async function RecipeContainer() {
    const getRecipesEndpoint = process.env.GET_RECIPES_ENDPOINT ?? ''
    const fetchRecipe = async () => {
        const res = await fetch(getRecipesEndpoint, { cache: 'no-store' })
        return await res.json()

    }
    const data = await fetchRecipe()

    if (!data) {
        return <div>Loading...</div>
    }
    return (
        <div  className="flex justify-center items-center">
            {data.map((recipe: RecipeData, index) => {
                return (<div className="recipe-container max-w-[220px]" key={index}>
                        <RecipeCard {...recipe}/>
                </div>)
            })}
        </div>
    )

}
