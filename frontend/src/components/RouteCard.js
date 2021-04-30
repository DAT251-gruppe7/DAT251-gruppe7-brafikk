import React, { useState, useEffect } from "react";
import "../App.css";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import { CardActionArea, CardHeader } from "@material-ui/core";
import { Grid, CircularProgress } from "@material-ui/core";
import { List, ListItem, Paper } from "@material-ui/core";
import axios from "axios";
import RouteSmallCard from './RouteSmallCard'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    bar: {
        marginTop: theme.spacing(0.5),
        marginLeft: theme.spacing(3),
        width: theme.spacing(1),
        height: `calc(100% - ${theme.spacing(1)}px)`,
    },
    list: {
        paddingLeft: theme.spacing(1),
    },
}));

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

export default function RouteCard(props) {
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const title = props.title;
    const loc = props.data;
    const [color, setColor] = useState("#c2eabd");
    const [points, setPoints] = useState({});


    useEffect(() => {
        fetchInformation();
    }, []);

    const fetchInformation = async () => {
        const res = await axios.get(`/api/path/?start_latitude=${loc.startLat}&start_longitude=${loc.startLon}&end_latitude=${loc.endLat}&end_longitude=${loc.endLon}`)
            .catch((err) => console.log(err));
        setPoints(res.data);
        if(!isEmpty(res.data)){
            setColor(Object.entries(res.data).map(([key, data], idx) => {
                return data.color;
            }).sort()[0]);
        }
        setLoading(false);
    };

    const handleCardExpandClick = (event) => {
        setCardExpanded(!cardExpanded);
    };

    const [cardExpanded, setCardExpanded] = useState(false);

    const routeInfo = loading ?
        <CardContent><Grid container justify="center">
            <CircularProgress />
        </Grid></CardContent>
        :
        <Paper className={classes.root} elevation={0}>
            <Card variant="elevation" elevation={0} style={{ backgroundColor: color }} >
                <CardHeader title={title} onClick={handleCardExpandClick}/>
            </Card>
            <Collapse in={cardExpanded} timeout="auto" unmountOnExit>
                <Grid container alignContent="flex-end" spacing={0}>
                    <Grid item xs={1} >
                        {!isEmpty(points) ? <Card variant="elevation" elevation={0} className={classes.bar} style={{ backgroundColor: color }}></Card> : <div/>}
                    </Grid>
                    <Grid item xs={11}>
                        <List component="div" dense disablePadding>
                            {
                                Object.entries(points).map(([id, loc], idx) =>
                                    <ListItem className={classes.list} disableGutters key={idx}>
                                        <RouteSmallCard title={loc.title} info={loc.info} color={loc.color} />
                                    </ListItem>)
                            }
                        </List>

                    </Grid>
                </Grid>
            </Collapse>
        </Paper>;
    return routeInfo;
}