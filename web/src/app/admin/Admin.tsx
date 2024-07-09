'use client'
import { Button } from "@mui/material";
import './admin.css'
import {useState} from "react";
import PushNotificationComponent from "@/app/push/toaser";
export default function Admin() {

    const [ingredient, setIngredient] = useState({ name: "" });
    const [recipe, setRecipe] = useState({ name: "", url: "", owner: "" });

    const [isAddingRecipe, setIsAddingRecipe] = useState(false);
    const [isAddingIngredient, setIsAddingIngredient] = useState(false);
    const addRecipeEndpoint = process.env.ADD_RECIPE_ENDPOINT ?? ''
    const addIngredientEndpoint = process.env.ADD_INGREDIENT_ENDPOINT ?? ''


    const addRecipe = async () => {
        setIsAddingRecipe(true);
        try {
            const response = await fetch(addRecipeEndpoint, {
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

    // Helper function to convert VAPID key
    function urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);
        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

    const subscribeUser = async (swRegistration) => {
        const vapidPublicKey = 'BAmtk2HxWuRLjUDRUAr4p7Aql97RmWsSHUuSWcvisxPNbibHyqKI9TSH6dly-wcCGyAwdYtPmXe7L-XY_c3lA7U'; // The public key generated in your Node.js server
        const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

        const subscription = await swRegistration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: convertedVapidKey
        });

        await fetch('/subscribe', {
            method: 'POST',
            body: JSON.stringify(subscription),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    const requestNotificationPermission = async () => {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            const swRegistration = await navigator.serviceWorker.ready;
            await subscribeUser(swRegistration);
        }
    };

    const addIngredient = async () => {
        setIsAddingIngredient(true);
        try {
            const response = await fetch(addIngredientEndpoint, {
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
                <Button disabled={isAddingRecipe} onClick={addRecipe} variant="contained">Add Recipe</Button>
                <Button variant="contained" onClick={requestNotificationPermission}>Enable Notifications</Button>
                <PushNotificationComponent></PushNotificationComponent>
            </div>
        </div>

    )
}
