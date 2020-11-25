import React, { useState, useRef, useEffect, useContext } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Appbar from '@material-ui/core/Appbar';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import SearchContext from '../Search';

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function PrimarySearchAppBar() {
    const classes = useStyles();
    const isSearching = useRef()
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState('placeholder');
    const context = useContext(SearchContext);

    const handleSearchInput = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        console.log('Test')
        search();
    };

    async function search() {

        // Pågående søk
        const previousSearch = isSearching.current;
        const currentSearch = Date.now();
        isSearching.current = currentSearch;

        // Utfør nytt søk
        const result = await axios(
            'http://127.0.0.1:8080/test/search?query=' + searchQuery
        ).then((result) => {
            if (currentSearch === isSearching.current) {
                setSearchResult('Found result');
                console.log("Success");
            }
            else {
                console.log("Ignored");
            }
        }).catch((error) => {
            if (currentSearch === isSearching.current) {
                setSearchResult('Failed');
                console.log("Failed");
            } else {
                console.log("Ignored");
            }
        });
    }

    return (
        <div className={classes.grow}>
            <Appbar>
                <Toolbar>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Søk…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={handleSearchInput}
                        />
                    </div>
                </Toolbar>
            </Appbar>
            <div>
                
            </div>
        </div>
    );
}
