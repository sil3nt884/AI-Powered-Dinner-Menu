'use client'
import { Button } from "@mui/material";
import './admin.css'
import {addRecipe} from "../../../../../server/routes/addRecipe";
import {useState} from "react";
export default function Admin() {

    const [ingredient, setIngredient] = useState({ name: "" });
    const [recipe, setRecipe] = useState({ name: "", url: "", owner: "" });

    const [isAddingRecipe, setIsAddingRecipe] = useState(false);
    const [isAddingIngredient, setIsAddingIngredient] = useState(false);

    const addRecipe = async () => {
        setIsAddingRecipe(true);
        try {
            const response = await fetch('http://localhost:3000/addRecipes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(recipe),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setRecipe({ name: "", url: "", owner: "" });

        } finally {
            setIsAddingRecipe(false);
            window.location.reload()// Set it to false whether our request resolves or rejects
        }
    }

    const addIngredient = async () => {
        setIsAddingIngredient(true);
        try {
            const response = await fetch('http://localhost:3000/addIngredient', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ingredient),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setIngredient({ name: "" });

        } finally {
            setIsAddingIngredient(false); // Set it to false whether our request resolves or rejects
        }
    }


    return (
        <div className="container">
            <div className="group">
                <h1>Add Ingredient</h1>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={ingredient.name}
                    onChange={(e) => setIngredient({...ingredient, name: e.target.value})}
                />
                <Button  disabled={isAddingIngredient} onClick={addIngredient} variant="contained">Add Ingredient</Button>
            </div>
            <div className="group">
                <h1>Add Recipe</h1>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={recipe.name}
                    onChange={(e) => setRecipe({...recipe, name: e.target.value})}
                />
                <label htmlFor="url">URL:</label>
                <input
                    type="text"
                    id="url"
                    name="url"
                    required
                    value={recipe.url}
                    onChange={(e) => setRecipe({...recipe, url: e.target.value})}
                />
                <label htmlFor="owner">Owner:</label>
                <input
                    type="text"
                    id="owner"
                    name="owner"
                    required
                    value={recipe.owner}
                    onChange={(e) => setRecipe({...recipe, owner: e.target.value})}
                />
                <Button  disabled={isAddingRecipe} onClick={addRecipe} variant="contained">Add Recipe</Button>
            </div>
        </div>

    )
}
