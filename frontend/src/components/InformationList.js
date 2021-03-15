import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from '@material-ui/core/Typography';
import FilterHdrIcon from '@material-ui/icons/FilterHdr';
import TollIcon from '@material-ui/icons/Toll';
import WarningIcon from '@material-ui/icons/Warning';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import axios from "axios";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));





function InformationList() {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [informations, setInformations] = useState([]);


    useEffect(() => {
        fetchInformation();
    }, []);


    const fetchInformation = () => {
        axios
            .get("/api/poi/?longitude=70&latitude=90")
            .then(res => setInformations(informations => [...informations, res.data]))
            .catch(err => console.log(err));
        console.log("Done with GET")
    }
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <div className={classes.root}>
            <Grid
                container
                direction="column"
                justify="space-evenly"
                alignItems="stretch"
            >
                {informations.map((info) => {
                    return (
                        <Card className={classes.root}>
                            < CardHeader />
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {info.title}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <IconButton
                                    className={
                                        clsx(classes.expand, {
                                            [classes.expandOpen]: expanded,
                                        })}
                                    onClick={handleExpandClick}
                                    aria-expanded={expanded}
                                    aria-label="show more"
                                >
                                    <ExpandMoreIcon />

                                </IconButton>
                            </CardActions>
                            <Collapse in={expanded} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <Typography paragraph>
                                        {info.info} på veg {info.road} på grunn av {info.situation_type}.
                                        Starttid: {info.starttime}. Sluttid: {info.endtime}
                                    </Typography>
                                </CardContent>
                            </Collapse>
                        </Card>

                    )
                })}
            </Grid>
        </div >

    )
}

/*
function InformationList() {

    const [informations, setInformations] = useState([])


    return (
        <div>
            <AppBar position="static">
                <div style={{ flexGrow: 1 }}>

                    {informations.map((info) => {
                        return (
                            <Toolbar className="Toolbar" key={info.id}>
                                {info.isMountain && <FilterHdrIcon />}
                                {!info.isMountain && <TollIcon />}
                                <Typography style={{ flexGrow: 1 }}>
                                    {info.title}
                                </Typography>
                                <Typography>
                                    {info.status}
                                </Typography>
                                {info.status === "Åpen" && <CheckCircleIcon />}
                                {info.status !== "Åpen" && <WarningIcon />}
                            </Toolbar>
                        )
                    })}
                </div>

            </AppBar>
        </div>
    )

}
*/

export default InformationList;

