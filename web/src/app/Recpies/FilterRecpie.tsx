'use client'
import './Recpies.css'

import RecipeCard from "@/app/Recpies/RecpieCard";
import {RecipeData} from "../../../../server/routes/getRecipes";
import {
  useRecoilValue,
} from 'recoil';
import { searchData } from "@/app/Search/Search";


export default function RecipFilter() {
    const data = useRecoilValue(searchData);
    return (
        <div>

            {data.map((recipe: RecipeData, index) => {
                return (<div className="recipe-container max-w-[220px]" key={index}>
                    <RecipeCard {...recipe}/>
                </div>)
            })}

        </div>
    )

}
