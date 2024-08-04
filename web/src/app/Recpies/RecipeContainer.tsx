import './Recpies.css'
import SearchBar from "@/app/Search/Search";
import RecipFilter from "@/app/Recpies/FilterRecpie";


export default async function RecipeContainer() {
    const getRecipesEndpoint = process.env.GET_RECIPES_ENDPOINT ?? ''
    const fetchRecipe = async () => {
        const res = await fetch(getRecipesEndpoint, { next: { revalidate: 300 } })
        return await res.json()

    }
    const data = await fetchRecipe()

    if (!data) {
        return <div>Loading...</div>
    }
    return (
        <>
            <div className={'search'}>
                <SearchBar data={data}/>
            </div>
            <div className="flex justify-center items-center">
                <RecipFilter></RecipFilter>
            </div>
        </>
    )

}
