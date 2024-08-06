import {Box} from "@mui/material";
import DinnersList from "@/app/Dinners/DinnersList";


export default function DinnerCustomTabPanel({data}) {

    return (
        <div>
            <Box sx={{ p: 3 }}>
                <DinnersList data={data}></DinnersList>
            </Box>
        </div>
    );
}

