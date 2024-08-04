'use client'
import {alpha, InputBase, styled} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {useEffect, useState} from "react";
import {
    atom, useSetRecoilState,
} from 'recoil';



export const searchData = atom({
    key: 'searchData',
    default: []

})

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    float: 'right',

    borderColor: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    border: '1px solid',
    width: '100%',
    minWidth: '41vw',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default function SearchBar({data}: {data: any}) {

    const setSearchData = useSetRecoilState(searchData);

    useEffect(() => {
        setSearchData(data)
    }, [])


    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase onChange={(e) => {
                const query = e.target.value;
                if(query.length < 3) {
                    return setSearchData(data)
                }
                if(query.length >= 3) {
                    const filterData = data.filter((recipe) => recipe.name.includes(query))
                    setSearchData(filterData)
                }
            }}
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
            />
        </Search>
    );
}