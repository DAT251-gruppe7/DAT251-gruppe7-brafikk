import React, { useState, useEffect } from "react";
import "../App.css";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import { CardActionArea } from "@material-ui/core";
import { Grid, CircularProgress } from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

export default function InformationCard(props) {
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const title = props.title;
    const [data, setData] = useState({
        color: "#dee2e6"
    });
    const loc = {
        lat: props.data.lat,
        lng: props.data.lng,
    };

    useEffect(() => {
        fetchInformation();
    }, []);

    const fetchInformation = async () => {
        console.log("Searching for", loc.lng, loc.lat)
        const res = await axios.get(`/api/poi/?longitude=${loc.lng}&latitude=${loc.lat}`)
            .catch((err) => console.log(err));
        setData(res.data);
        setLoading(false);
    };

    const handleExpandClick = (event) => {
        setExpanded(!expanded);
    };


    const [expanded, setExpanded] = useState(false);
    const showTime =
        (data.startTime === "" || data.startTime === undefined) ? (
            <Typography variant="body2" align="left">

            </Typography>
        ) : (
            <Typography variant="body2" align="left">
                {data.startTime.substr(0, 5)}-{data.endTime.substr(0, 5)}
            </Typography>
        );

    const cardInfo = loading ?
        <CardContent><Grid container justify="center">
            <CircularProgress />
        </Grid></CardContent>
        :
        <CardContent>
            <Grid container>
                <Grid item xs={11}>
                    <Typography variant="h6" align="left">
                        {title}
                    </Typography>
                </Grid>
                <Grid item xs={1}>
                    <Typography variant="body2" align="right">
                        {data.road}
                    </Typography>
                </Grid>
                {showTime}
            </Grid>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Typography variant="body1" align="left">
                    {data.info}
                </Typography>
            </Collapse>
        </CardContent>;

    return (
        <Card
            variant="elevation" elevation={0}
            className={classes.root}
            style={{ backgroundColor: data.color }}
        >
            <CardActionArea onClick={handleExpandClick}>
                {cardInfo}
            </CardActionArea>
        </Card>
    );
}