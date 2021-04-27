import React, { useState, useEffect } from "react";
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import InformationCard from './InformationCard';
import { List, ListItem } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import DialogSearchPosition from './DialogSearchPosition'
import Cookies from 'js-cookie';

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
    const [latLon, setLatLon] = React.useState(Cookies.get('latLon') ? JSON.parse(Cookies.get('latLon')) : {});


    const callBackDeleteFunction = (name) => {
        console.log("CallBackDeleteFunction Called. Want to delete name");
        let currLatLon = latLon;
        delete currLatLon[name]
        setLatLon(currLatLon);
    }


    const callBackFunction = (obj) => {
        console.log("Callbackfunction called");
        console.log(latLon);
        console.log(obj)
        const pos = obj[Object.keys(obj)[0]];
        console.log(pos)
        Cookies.set('latLon', JSON.stringify({ ...latLon, ...obj }), { expires: 3650 });
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
                            <InformationCard
                                id={idx}
                                title={key}
                                data={loc}
                                parentDeleteCallBack={callBackDeleteFunction}
                            />
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

