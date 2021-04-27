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

export default function RouteSmallCard(props) {
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState(false);
    const [title, setTitle] = useState(props.title);
    const [info, setInfo] = useState(props.info);

    const handleExpandClick = (event) => {
        setExpanded(!expanded);
    };

    return (
        <Card variant="outlined">
            <CardActionArea onClick={handleExpandClick}>
                <CardContent>
                    <Typography>
                        {title}
                    </Typography>
                </CardContent>

                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography>
                            {info}
                        </Typography>
                    </CardContent>
                </Collapse>
            </CardActionArea>
        </Card>
    );
}