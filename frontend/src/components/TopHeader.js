import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import brafikk_logo from '../assets_frontend/brafikk_logo.png';
import '../App.css';
import { Card, CardMedia } from '@material-ui/core';


const useStyles = makeStyles({
    media: {
        height: 140,

    },
});

function TopHeader() {
    const classes = useStyles();

    return (
        <Card>
            <CardMedia
                className={classes.media}
                image={brafikk_logo}
                title="Brafikk Logo"
            />
        </Card>
    )
}




export default TopHeader;