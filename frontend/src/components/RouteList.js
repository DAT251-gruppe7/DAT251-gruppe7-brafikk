import React, { useState, useEffect } from "react";
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import InformationCard from './InformationCard';
import { List, ListItem } from "@material-ui/core";
import DialogSearchPosition from './DialogSearchPosition'
import Cookies from 'js-cookie';
import RouteCard from './RouteCard.js'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(10),
        right: theme.spacing(4),
    },
    list: {
        marginBottom: 45,
    },
    grid: {
        paddingTop: 0,
        paddingBot: 0,
        paddingLeft: 5,
        paddingRight: 5,
    },
}));

function InformationList() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [routes, setRoutes] = React.useState(Cookies.get('Routes') ? JSON.parse(Cookies.get('Routes')) : {});



    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    }

    const locs = [{
        title: "Hjemme - Hytta",
        startEnd: {
            startLat: 60.38615347504535,
            startLon: 5.337193980378472,
            endLat: 60.46900848889433,
            endLon: 5.32689429784574,
        },
    }];

    return (
        <div className={classes.root}>
            <List componen="div">
                {
                    locs.map((elem, idx) => {
                        console.log(elem);
                        return (
                            <ListItem key={idx}>
                                <RouteCard title={elem.title} data={elem.startEnd} />
                            </ListItem>
                        );
                    })
                }
            </List>
        </div>
    )
}

export default InformationList;

