import React from 'react'
import { Container } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

}));

export default function SearchResult(props) {
    const classes = useStyles();
    const searchResult = JSON.stringify(props.result);

    return (
        <div className={classes.grow}>
            <Container>
                <p>{searchResult}</p>
            </Container>
        </div>
    )
}
