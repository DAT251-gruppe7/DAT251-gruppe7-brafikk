import React, { useState } from "react";
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import InformationCard from './InformationCard';
import { List, ListItem } from "@material-ui/core";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DialogSearchPosition from './DialogSearchPosition'

const locs = {
    "Random Sted": {
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

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    }

    return (
        <div className={classes.root}>
            <List className={classes.list}
            >
                {Object.entries(locs).map(([key, loc], idx) => {
                    return (
                        <ListItem alignItems="center" key={idx} className={classes.grid}>
                            <InformationCard title={key} data={loc} />
                        </ListItem>
                    )
                })}
            </List>

            <DialogSearchPosition />

        </div>
    )
}

export default InformationList;

