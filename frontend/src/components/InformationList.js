import React, { useState, useEffect } from "react";
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import InformationCard from './InformationCard';


const locs = {
    "RandomSted": {
        "lat": 61.42070084171688,
        "lng": 5.4875439277981926,
    },
    "Sigerfjordtunnelen": {
        "lat": 68.63514,
        "lng": 15.633203,
    },
    "Snubba": {
        "lat": 68.53292,
        "lng": 17.188206,
    },
    "Krokdal": {
        "lat": 59.759533,
        "lng": 11.294941,
    }
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    grid:{
        paddingTop: 5,
        paddingLeft: 5,
        paddingRight: 5,
    },
}));

function InformationList() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container 
                direction="column"
                justify="space-evenly"
                alignItems="stretch"
            >
                {Object.entries(locs).map(([key,loc], idx) => {
                    return (
                        <Grid key={idx} item className={classes.grid}>
                            <InformationCard title={key} data={loc}/>
                        </Grid>
                    )
                })}
            </Grid>
        </div>

    )
}

export default InformationList;

