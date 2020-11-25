import React, { useState, useRef, useEffect, useContext } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Appbar from '@material-ui/core/Appbar';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import SearchInput from './components/SearchInput';
import SearchResult from './components/SearchResult';

export default function Search() {

    const isSearching = useRef();
    const [searchResult, setSearchResult] = useState();

    async function searchQuery(query) {

        // Pågående søk
        const currentSearch = Date.now();
        isSearching.current = currentSearch;

        // Utfør nytt søk
        const result = await axios(
            'http://127.0.0.1:8080/search?query=' + query
        ).then((result) => {
            if (currentSearch === isSearching.current) {
                setSearchResult(result.data);
                console.log("Success");
            }
            else {
                console.log("Ignored");
            }
        }).catch((error) => {
            if (currentSearch === isSearching.current) {
                //setSearchResult('Failed');
                console.log("Failed");
            } else {
                console.log("Ignored");
            }
        });
    }

    return (
        <>
            <SearchInput query={searchQuery} />
            <SearchResult result={searchResult} />
        </>
    )
}
