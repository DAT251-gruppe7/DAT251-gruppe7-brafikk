import React, { useState } from "react";
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import InformationCard from './InformationCard';
import { List, ListItem, ListItemText, Typography, Paper } from "@material-ui/core";
import DialogSearchPosition from './DialogSearchPosition'
import Cookies from 'js-cookie';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(10),
        right: theme.spacing(4),
    },
    list: {
        marginBottom: 45,
    },
    grid: {
        paddingTop: 0,
        paddingBot: 0,
        paddingLeft: 5,
        paddingRight: 5,
    },
}));

function objIsEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function InformationList() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [locs, setLocs] = useState();
    const [checked, setChecked] = React.useState([]);
    const [checkedList, setCheckedList] = useState([])

    // TODO now, when we update the state, it should re render the objects. This might be a problem if 
    // they do a new request for all of them every time we add an object to this state 
    const [latLon, setLatLon] = React.useState(
        Cookies.get('PointsOfInterest')  ? JSON.parse(Cookies.get('PointsOfInterest')) : {});
    const [isDeleting, setIsDeleting] = useState(false);
    const [isEmpty, setIsEmpty] = useState(true);


    const handleCheckBoxToggle = (value) => () => {
        console.log("checked: ", checked);
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        }
        else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    }

    const callBackDeleteFunction = (name) => {
        console.log("CallBackDeleteFunction Called. Want to delete name");
        let currLatLon = latLon;
        console.log(currLatLon);
        delete currLatLon[name];
        console.log(currLatLon)
        Cookies.set('PointsOfInterest', JSON.stringify({ currLatLon }), { expires: 3650 });
        setLatLon(currLatLon);
    }

    const callBackFunction = (obj) => {
        console.log("Callbackfunction called");
        console.log(latLon);
        console.log(obj)
        const pos = obj[Object.keys(obj)[0]];
        console.log(pos)
        Cookies.set('PointsOfInterest', JSON.stringify({ ...latLon, ...obj }), { expires: 3650 });
        setLatLon({ ...latLon, ...obj });
        setIsEmpty(false);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    }

    const testHandleDeleteClick = () => {
        console.log("TEST");

        // When the user wants to delete, first fill the checkedList array with False
        for (var i = 0; i < latLon.length; i++) {
            setCheckedList(checkedList.push(false));
        }
        console.log("CheckedList: ", checkedList);
        setIsDeleting(true);
    }

    const anotherExecuteDeletion = () => {
        console.log("Inside anotherTestHandleDeleteClick");

        console.log("Checked: ", checked);

        const newLatLon = latLon;
        const keys = Object.keys(latLon);
        console.log("latLon before: ", latLon);
        for (var i = 0; i < checked.length; i++) {
            console.log("Deleting ", keys[checked[i]]);
            delete newLatLon[keys[checked[i]]];
            //newLatLon.splice(keys[i])
        }

        console.log("newLatLon after: ", newLatLon);

        Cookies.set('PointsOfInterest', JSON.stringify(newLatLon), { expires: 3650 });
        setLatLon(newLatLon);
        if (Object.keys(latLon).length === 0) {
            setIsEmpty(true);
            Cookies.remove('PointsOfInterest');
        }
        setIsDeleting(false);
        setCheckedList([]);
        setChecked([]);
        console.log("LatLon in the end: ", latLon);
    }


    return (
        <div className={classes.root}>
            <List className={classes.list}>


                {objIsEmpty(latLon) ? (
                    <Paper elevation={0} >
                        <Typography style={{margin: '1vh'}}>
                            No locations added yet. Press the + button to add a location
                        </Typography>
                    </Paper>
                ) : isDeleting ? (
                    <ListItem
                        button
                        //onClick={executeDeletion}
                        onClick={anotherExecuteDeletion}
                    >
                        <ListItemText primary="Confirm" />
                    </ListItem>
                ) : (
                    <ListItem button onClick={testHandleDeleteClick}>
                        <ListItemText primary="Delete" />
                    </ListItem>)}
                {(!objIsEmpty(latLon) ? Object.entries(latLon).map(([key, loc], idx) => {
                    const labelId = `checkbox-list-secondary-label-${idx}`;
                    return (
                        <ListItem alignItems="center" key={idx} className={classes.grid}>
                            {isDeleting && (
                                <ListItemIcon>
                                    <Checkbox
                                        edge="end"
                                        onChange={handleCheckBoxToggle(idx)}
                                        checked={checked.indexOf(idx) !== -1}
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </ListItemIcon>)}
                            <InformationCard
                                title={key}
                                data={loc}
                                parentDeleteCallBack={callBackDeleteFunction}
                            />
                        </ListItem>
                    )
                } ) : <p/>)}
            </List>

            <DialogSearchPosition
                parentCallBack={callBackFunction}
            //parentLatLon={latLon}
            />

        </div>
    )
}

export default InformationList;

