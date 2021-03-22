import React, { useState, useEffect } from "react";
import "../App.css";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import { CardActionArea } from "@material-ui/core";
import { Grid, Paper, CircularProgress } from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

export default function InformationCard(props) {
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [loc, setLoc] = useState({
        title: props.title,
        lat: props.data.lat,
        lng: props.data.lng,
    });
    const [data, setData] = useState({
        color: "#dee2e6"
    });

    useEffect(() => {
        fetchInformation();
    }, []);

    const fetchInformation = async () => {
        const res = await axios.get(`/api/poi/?longitude=${loc.lat}&latitude=${loc.lng}`)
            .catch((err) => console.log(err));
        setData(res.data);
        setLoading(false);
    };

    const handleExpandClick = (event) => {
        setExpanded(!expanded);
    };

    const [expanded, setExpanded] = useState(false);
    const showTime =
        data.startTime === "" ? (
            ""
        ) : (
            <Typography variant="body2" align="left">
                {data.startTime}-{data.endTime}
            </Typography>
        );

    const cardInfo = loading ? 
        <CardContent><CircularProgress /></CardContent> 
        :
        <CardContent>
            <Grid container>
                <Grid item xs={11}>
                    <Typography variant="h6" align="left">
                        {data.title}
                    </Typography>
                </Grid>
                <Grid item xs={1}>
                    <Typography variant="body2" align="left">
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
            variant="outlined"
            className={classes.root}
            style={{ backgroundColor: data.color }}
        >
            <CardActionArea onClick={handleExpandClick}>
                {cardInfo}
            </CardActionArea>
        </Card>
    );
}