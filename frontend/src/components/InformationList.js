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
    // const [isNewWarning, setIsNewWarning] = useState([])


    useEffect(() => {
        fetchInformation();
        fetchInformation();
    }, []);


    const fetchInformation = () => {
        axios
            .get("/api/poi/?longitude=70&latitude=90")
            .then(res => {
                setInformations(informations =>
                    [...informations, { seen: false, expanded: false, data: res.data }])
            })
            .catch(err => console.log(err))
        console.log("Done with GET")
        console.log(informations.length)
    }
    const handleExpandClick = (index) => {
        setExpanded(!expanded);
        //informations[index].seen = true;
    };

    return (
        <div className={classes.root}>
            <Grid
                container
                direction="column"
                justify="space-evenly"
                alignItems="stretch"
                spacing={2}
            >
                {informations.map((info, index) => {
                    return (
                        <Card className={classes.root} key={info.id}>
                            <CardHeader />
                            <CardContent>
                                <Typography variant="h6" color="textSecondary" component="p">
                                    <b>{!info.seen ? "(!) " + info.data.title : info.data.title}</b>
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <IconButton
                                    className={
                                        clsx(classes.expand, {
                                            [classes.expandOpen]: expanded,
                                        })}
                                    onClick={() => {
                                        setExpanded(!expanded);
                                        let newArr = informations;
                                        newArr[index].seen = true
                                        newArr[index].expanded = !newArr[index].expanded
                                        setInformations(newArr)
                                    }}
                                    aria-expanded={expanded}
                                    aria-label="show more"
                                >
                                    <ExpandMoreIcon />

                                </IconButton>
                            </CardActions>
                            <Collapse in={info.expanded} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <Typography paragraph>
                                        {info.data.info} på veg {info.data.road} på grunn av {info.data.situation_type}.
                                        Starttid: {info.data.starttime}. Sluttid: {info.data.endtime}
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

