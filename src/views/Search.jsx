import React, { useState, useRef } from 'react';
import axios from 'axios';
import SearchInput from './components/SearchInput';
import SearchResult from './components/SearchResult';

export default function Search() {

    const isSearching = useRef();
    const [searchResult, setSearchResult] = useState();

    async function searchQuery(query) {
        const currentSearch = Date.now();
        isSearching.current = currentSearch;

        await axios(
            'http://127.0.0.1:8080/search?query=' + query
        ).then((result) => {
            if (currentSearch === isSearching.current)
                setSearchResult(result.data);
        }).catch((error) => {
            console.warn("Failed to connect to API for search!");
        });
    }

    return (
        <>
            <SearchInput query={searchQuery} />
            <SearchResult result={searchResult} />
        </>
    )
}
