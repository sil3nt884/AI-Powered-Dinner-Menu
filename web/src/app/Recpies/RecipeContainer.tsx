'use client'
import './Recpies.css'
import SearchBar from "@/app/Search/Search";
import RecipFilter from "@/app/Recpies/FilterRecpie";


export default function RecipeContainer({data}) {
    return (
        <div>
            <div className={'search'}>
                <SearchBar data={data}/>
            </div>
            <div className="flex justify-center items-center">
                <RecipFilter></RecipFilter>
            </div>

        </div>

    )

}
