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
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

export default function InformationCard(props) {
    const classes = useStyles();
    const [id, setId] = useState(props.id);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState(props.title);
    const [loc, setLoc] = useState({
        lat: props.data.lat,
        lng: props.data.lng,
    });
    const [data, setData] = useState({
        color: "#dee2e6"
    });

    useEffect(() => {
        fetchInformation();
    }, []);


    const callBackDeleteFunction = props.parentDeleteCallBack;


    const fetchInformation = async () => {
        const res = await axios.get(`/api/poi/?longitude=${loc.lng}&latitude=${loc.lat}`)
            .catch((err) => console.log(err));
        setData(res.data);
        setLoading(false);
    };

    const handleExpandClick = (event) => {
        setExpanded(!expanded);
    };


    const handleDeleteClick = (event) => {
        console.log("Delete button clicked!");
        callBackDeleteFunction(id);
    }


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
                <IconButton aria-label="delete" onClick={handleDeleteClick}>
                    <DeleteIcon />
                </IconButton>
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