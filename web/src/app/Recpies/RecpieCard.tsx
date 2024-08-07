'use client'
import {Button, Card} from "@mui/material";
import {RecipeData} from "../../../../server/routes/getRecipes";
import { useState } from "react";
import RecipeModal from "@/app/Recpies/RecipeModal";
import { ToastContainer, toast } from 'react-toastify';

export default function RecipeCard(recipe:  RecipeData) {

    const [isModalOpen, setModalOpen] = useState(false);
    const addDinnerEndpoint = process.env.ADD_DINNER_ENDPOINT ?? '';

    const handleCardClick = () => {
        setModalOpen(!isModalOpen);

    }
    const handleButtonClick = async (event) => {
        event.stopPropagation();
        const body = JSON.stringify({
            recipe_id: recipe.id
        })
        await fetch(addDinnerEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body
        })
        toast('Dinner Added');
        setTimeout(() => {
            window.location.reload();
        }, 3000);
    }

    return (
        <>
            <Card className="flex justify-center items-center border-b-gray-950" onClick={handleCardClick}>
                <h1>{recipe.name}</h1>
                <a href={recipe.url}/>
                <h2>{recipe.owner}</h2>
                <Button  variant="contained" onClick={handleButtonClick}>Add To Dinners </Button>
                {isModalOpen && <RecipeModal recipe={recipe} isOpen={isModalOpen} />}
            </Card>
            <ToastContainer />
        </>

    )
}
