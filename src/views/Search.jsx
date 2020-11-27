import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Container } from '@material-ui/core';
import SearchInput from './components/SearchInput';
import SearchResult from './components/SearchResult';

export default function Search() {

    const isSearching = useRef();
    const [searchResult, setSearchResult] = useState([]);

    async function searchQuery(query) {
        setSearchResult([]);
        const currentSearch = Date.now();
        isSearching.current = currentSearch;

        await axios(
            'https://api.ehfsok.no/search?query=' + query
        ).then((result) => {
            if (currentSearch === isSearching.current)
                setSearchResult(result.data);
        }).catch((error) => {
            console.warn("Failed to connect to API for search!");
            setSearchResult([]);
        });
    }

    return (
        <Container>
            <SearchInput query={searchQuery} />
            <SearchResult result={searchResult} />
        </Container>
    )
}
