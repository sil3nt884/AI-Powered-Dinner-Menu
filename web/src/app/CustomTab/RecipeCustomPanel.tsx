'use client'
import {Box} from "@mui/material";
import RecipeContainer from "@/app/Recpies/RecipeContainer";


export default function RecipeCustomTabPanel({data}) {

    return (
        <div>
            <Box sx={{ p: 3 }}>
                <RecipeContainer data={data} />
            </Box>
    </div>
);
}

