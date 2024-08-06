'use server'
import HomePage from "@/app/Home";

type Dinner = {
    name: string;
    url: string;
}

export default async function Home() {

    const getRecipesEndpoint = process.env.GET_RECIPES_ENDPOINT ?? ''
    const endpoint = process.env.DINNERS_ENDPOINT ?? '';


    const fetchRecipe = async () => {
        const res = await fetch(getRecipesEndpoint, { next: { revalidate: 300 } })
        return await res.json()

    }
    const data = await fetchRecipe()

    if (!data) {
        return <div>Loading...</div>
    }

    const dinners: Dinner[]  = await (await fetch(endpoint, { next: { revalidate: 60 } })).json();

    if(!dinners) {
        return <h1> No Dinners </h1>
    }



    return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
         <HomePage data={data} dinners={dinners} >
        </HomePage>
    </div>
  );
}
