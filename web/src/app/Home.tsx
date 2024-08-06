'use client';
import {SyntheticEvent, useState } from "react";
import {Box, Tab, Tabs} from "@mui/material";
import {
    RecoilRoot,
} from 'recoil';
import AdminCustomTabPanel from "@/app/CustomTab/AdminCustomTab";
import RecipeCustomTabPanel from "@/app/CustomTab/RecipeCustomPanel";
import DinnerCustomTabPanel from "@/app/CustomTab/DinnerCustomPanel";



export default function HomePage({data, dinners}) {
    const [value, setValue] = useState(0);

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <RecoilRoot>
            <section>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Admin" />
                        <Tab label="Recpies" />
                        <Tab label="Dinners" />
                    </Tabs>
                </Box>
                {value === 0 && <AdminCustomTabPanel />}
                {value === 1 && <RecipeCustomTabPanel  data={data}/>}
                {value === 2 && <DinnerCustomTabPanel  data={dinners}/>}
            </section>
         </RecoilRoot>
    );
}
