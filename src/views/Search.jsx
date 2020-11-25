import React, { useContext } from 'react';
import SearchInput from './components/SearchInput';

export const SearchContext = React.createContext();

export default function Search() {
    return (
        <SearchContext.Provider>
            <SearchInput />
        </SearchContext.Provider>
    )
}
