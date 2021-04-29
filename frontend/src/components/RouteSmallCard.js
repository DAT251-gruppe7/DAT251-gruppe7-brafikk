import React, { useState, useEffect } from "react";
import "../App.css";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import { CardActionArea, CardHeader } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function RouteSmallCard(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const title = props.title;
    const info = props.info;
    const color = props.color;

    const handleExpandClick = (event) => {
        setExpanded(!expanded);
    };

    return (
        <Card variant="outlined"
            className={classes.root}
            style={{ backgroundColor: color }}
            >
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