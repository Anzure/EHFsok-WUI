import React, { useState, useRef } from "react";
import axios from "axios";
import { Grid } from "@material-ui/core";
import SearchInput from "./components/SearchInput";
import SearchResult from "./components/SearchResult";
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";

export default function Search() {
  const isSearching = useRef();
  const [searchResult, setSearchResult] = useState([]);

  async function searchQuery(query) {
    setSearchResult(null);
    const currentSearch = Date.now();
    isSearching.current = currentSearch;

    await axios("https://api.ehfsok.no/search?query=" + query)
      .then((result) => {
        if (currentSearch === isSearching.current) setSearchResult(result.data);
      })
      .catch((error) => {
        console.warn("Failed to connect to API for search!");
        setSearchResult(null);
      });
  }

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
    >
      <Grid item>
        <SearchInput query={searchQuery} />
      </Grid>
      <Grid item>
        <ReactPlaceholder
          style={{ width: 300 }}
          showLoadingAnimation
          type="text"
          rows={7}
          ready={searchResult}
        >
          <SearchResult result={searchResult ? searchResult : []} />
        </ReactPlaceholder>
      </Grid>
    </Grid>
  );
}
