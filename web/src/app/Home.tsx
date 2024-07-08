'use client';
import Admin from "@/app/admin/Admin";
import {SyntheticEvent, useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import DinnersListClient from "@/app/Dinners/DinnersListClient";



interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}



export default function HomePage(props) {
    const [value, setValue] = useState(0);

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
            <section>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Admin" />
                        <Tab label="Recpies" />
                        <Tab label="Dinners" />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <Admin />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    {props.children}
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    {props.DinnerList}
                </CustomTabPanel>
            </section>
    );
}
