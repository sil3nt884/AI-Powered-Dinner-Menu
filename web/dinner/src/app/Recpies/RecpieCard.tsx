'use client'
import {Button, Card} from "@mui/material";
import {RecipeData} from "../../../../../server/routes/getRecipes";
import { useState } from "react";
import RecipeModal from "@/app/Recpies/RecipeModal";


export default function RecipeCard(recipe:  RecipeData) {

    const [isModalOpen, setModalOpen] = useState(false);

    const handleCardClick = () => {
        setModalOpen(!isModalOpen);
    }
    const handleButtonClick = async (event) => {
        event.stopPropagation();
        const body = JSON.stringify({
            recipe_id: recipe.id
        })
        console.log(body)
        await fetch('http://localhost:3000/addDinner', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body
        })

    }

    return (
        <Card className="flex justify-center items-center" onClick={handleCardClick}>
            <h1>{recipe.name}</h1>
            <a href={recipe.url}/>
            <h2>{recipe.owner}</h2>
            <Button  variant="contained" onClick={handleButtonClick}>Add To Dinners </Button>
            {isModalOpen && <RecipeModal recipe={recipe} isOpen={isModalOpen} />}
        </Card>
    )
}
