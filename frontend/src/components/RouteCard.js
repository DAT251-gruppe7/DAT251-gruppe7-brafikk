import React, { useState, useEffect } from "react";
import "../App.css";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import { CardActionArea, CardHeader } from "@material-ui/core";
import { Grid, CircularProgress } from "@material-ui/core";
import { List, ListItem, ListItemText, ListItemIcon, Button } from "@material-ui/core";
import axios from "axios";
import RouteSmallCard from './RouteSmallCard'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

export default function RouteCard(props) {
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState(props.title);
    const [loc, setLoc] = useState(props.data);

    const [points, setPoints] = useState({
        "140367118147056": {
            "id": "NPRA_VL_294007",
            "title": "Ev 39 Fløyfjellstunnelen, på strekningen Bergen (Nygårdstangen) - Førde, i retning mot Førde",
            "startTime": "",
            "endTime": "",
            "info": "Stengt på grunn av vedlikeholdsarbeid. Utrykningskjøretøy kan passere.",
            "road": "E39",
            "color": "#ed254e"
        },
        "140367118145616": {
            "id": "NPRA_VL_294016",
            "title": "Ev 39 Fløyfjellstunnelen, på strekningen Bergen (Nygårdstangen) - Førde, i retning mot Førde",
            "startTime": "",
            "endTime": "",
            "info": "Stengt på grunn av vedlikeholdsarbeid. Utrykningskjøretøy kan passere.",
            "road": "E39",
            "color": "#ed254e"
        },
        "140367118660752": {
            "id": "NPRA_VL_281755",
            "title": "Ev 39 Munkebotnentunnelen, på strekningen Sandviken - Gamle Bergen, i retning mot Gamle Bergen",
            "startTime": "01:45:00",
            "endTime": "05:30:00",
            "info": "Stengt på grunn av vedlikeholdsarbeid i periodene: Mandag til fredag fra 01:45 til 05:30. Stengt for all trafikk - inkl nødetater",
            "road": "E39",
            "color": "#f9dc5c"
        },
        "140367119759728": {
            "id": "NPRA_VL_294027",
            "title": "Ev 39 Eidsvågstunnelen, på strekningen Førde - Bergen (Nygårdstangen), i retning mot Bergen (Nygårdstangen)",
            "startTime": "",
            "endTime": "",
            "info": "Stengt på grunn av vedlikeholdsarbeid. Utrykningskjøretøy kan passere.",
            "road": "E39",
            "color": "#ed254e"
        },
        "140367118145040": {
            "id": "NPRA_VL_294026",
            "title": "Ev 39 Glaskartunnelen - Selviktunnelen, på strekningen Førde - Bergen (Nygårdstangen), i retning mot Bergen (Nygårdstangen)",
            "startTime": "",
            "endTime": "",
            "info": "Stengt på grunn av vedlikeholdsarbeid. Utrykningskjøretøy kan passere.",
            "road": "E39",
            "color": "#ed254e"
        }
    });


    useEffect(() => {
        fetchInformation();
    }, []);

    const fetchInformation = async () => {
        //const res = await axios.get(`/api/path/?start_latitude=${loc.startLat}&start_longitude=${loc.startLon}&end_latitude=${loc.endLat}&end_longitude=${loc.endLon}`)
        //    .catch((err) => console.log(err));
        //setData(res.data);
        //console.log(res);
        setLoading(false);
    };

    const handleCardExpandClick = (event) => {
        setCardExpanded(!cardExpanded);
    };
    const handleRouteExpandClick = (event) => {
        setRouteExpanded(!routeExpanded);
    };

    const [cardExpanded, setCardExpanded] = useState(false);
    const [routeExpanded, setRouteExpanded] = useState(false);

    const routeInfo = loading ?
        <CardContent><Grid container justify="center">
            <CircularProgress />
        </Grid></CardContent>
        :
        <CardContent>
            <CardHeader
                title={title}
                onClick={handleCardExpandClick}
            />
            <Collapse in={cardExpanded} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {Object.entries(points).map(([id, loc], idx) => {
                        return (
                            <RouteSmallCard title={loc.title} info={loc.info}/>
                        )
                    })}
                </List>
            </Collapse>
        </CardContent>;

    return (
        <Card
            className={classes.root}
            variant="outlined"
        > 
            {routeInfo}
        </Card>
    );
}