import React, { useState, useEffect } from "react";
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import InformationCard from './InformationCard';
import { List, ListItem } from "@material-ui/core";
import DialogSearchPositionPaths from './DialogSearchPositionPaths'
import Cookies from 'js-cookie';
import RouteCard from './RouteCard.js'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: 55,
        padding: theme.spacing(1),
    },
}));

function InformationList() {
    const classes = useStyles();
    const [routes, setRoutes] = useState(Cookies.get('Routes') ? JSON.parse(Cookies.get('Routes')) :
        [{
            title: "Hjemme - Hytta",
            startEnd: {
                startLat: 60.38615347504535,
                startLon: 5.337193980378472,
                endLat: 60.46900848889433,
                endLon: 5.32689429784574,
            },
        },
        {
            title: "Jobb - Hjem",
            startEnd: {
                startLat: 60.31259388676431, 
                startLon: 5.332594024305421, 
                endLat: 60.323571676958274,
                endLon: 5.335681641610515,
            },
        },
        {
            title: "Jobb - Hytta",
            startEnd: {
                startLat: 62.273689640365525,
                startLon: 5.331273660641454,
                endLat: 62.312176363529964,
                endLon: 5.3337100734606135,
            },
        }]
    );

    const callBackFunction = (obj) => {
        console.log("Callbackfunction called");
        const newRouteList = routes.concat(obj);
        setRoutes(newRouteList);
        Cookies.set('Routes', JSON.stringify(newRouteList), { expires: 3650 });
        /*
        console.log(latLon);
        console.log(obj)
        const pos = obj[Object.keys(obj)[0]];
        console.log(pos)
        Cookies.set('Routes', JSON.stringify({ ...latLon, ...obj }), { expires: 3650 });
        setLatLon({ ...latLon, ...obj });
        */
    }

    return (
        <div>
        <List component="div" dense className={classes.root}>
            {
                routes.map((elem, idx) =>
                    <ListItem disableGutters key={idx}>
                        <RouteCard title={elem.title} data={elem.startEnd} />
                    </ListItem>)
            }
        </List>
        <DialogSearchPositionPaths parentCallBack={callBackFunction} />
        </div>
    )
}

export default InformationList;

