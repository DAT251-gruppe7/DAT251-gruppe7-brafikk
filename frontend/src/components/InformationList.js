import React, { useState, useEffect } from "react";
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import InformationCard from './InformationCard';
import { List, ListItem } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import DialogSearchPosition from './DialogSearchPosition'

/*
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
    },
    "Mell": {
        "lat": 59.408787,
        "lng": 10.661222,
    },
    "Torvastad": {
        "lat": 59.380585,
        "lng": 5.2414513,
    },
    "Fjellsrud": {
        "lat": 59.759533,
        "lng": 11.294941,
    }
}
*/

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
    const [locs, setLocs] = useState()
    // TODO now, when we update the state, it should re render the objects. This might be a problem if 
    // they do a new request for all of them every time we add an object to this state 
    const [latLon, setLatLon] = React.useState({
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
    });


    const callBackFunction = (obj) => {
        console.log("Callbackfunction called");
        console.log(latLon);
        console.log(obj)
        const pos = obj[Object.keys(obj)[0]];
        console.log(pos)
        setLatLon({ ...latLon, ...obj });

    }

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
                {Object.entries(latLon).map(([key, loc], idx) => {
                    return (
                        <ListItem alignItems="center" key={idx} className={classes.grid}>
                            <InformationCard title={key} data={loc} />
                        </ListItem>
                    )
                })}
            </List>

            <DialogSearchPosition
                parentCallBack={callBackFunction}
            //parentLatLon={latLon}
            />

        </div>
    )
}

export default InformationList;

