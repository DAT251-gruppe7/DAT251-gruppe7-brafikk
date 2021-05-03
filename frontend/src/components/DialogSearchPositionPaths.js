import React, { useState } from 'react';
import { Button, Fab, TextField } from '@material-ui/core';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete';
import '@geoapify/geocoder-autocomplete/styles/round-borders.css'
import './myStyle.css';

const useStyles = makeStyles((theme) => ({
    dialogPaper: {
        minHeight: '80vh',
        maxHeight: '80vh',
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(10),
        right: theme.spacing(4),
    },
}));



export default function DialogSearchPosition(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [locationSearchFrom, setLocationSearchFrom] = useState({});
    const [locationSearchTo, setLocationSearchTo] = useState({});
    const [title, setTitle] = useState("Bergen - Oslo DEFAULT");
    const scroll = 'paper';
    const apiKey = process.env.REACT_APP_GEOAPIFY_API_KEY;

    const language = "no";
    const countryCodes = undefined;
    const value = "";
    const filterByCountryCode = ['no'];

    const onPlaceSelectFrom = (value) => {
        console.log("onPlaceSelect: ", value);
        if(value === undefined || value === null) return;
        const newPosition = {
            "lat": value.properties.lat,
            "lng": value.properties.lon,
        };

        setLocationSearchFrom(newPosition);
        console.log("New from position: ", newPosition)
    }

    const onPlaceSelectTo = (value) => {
        console.log("onPlaceSelect: ", value);
        if(value === undefined || value === null) return;
        const newPosition = {
            "lat": value.properties.lat,
            "lng": value.properties.lon,
        };
        setLocationSearchTo(newPosition);
        console.log("New to position: ", newPosition)
    }

    const onSuggectionChangeTo = (value) => {
        console.log("onSuggestionChange: ", value);
        if (value.length > 0) {
            setLocationSearchTo(value[0].properties.name);
            console.log("Current locationSearch: ", locationSearchTo);
        }
    };

    const onSuggectionChangeFrom = (value) => {
        console.log("onSuggestionChange: ", value);
        if (value.length > 0) {
            setLocationSearchFrom(value[0].properties.name);
            console.log("Current locationSearch: ", locationSearchFrom);
        }
    };

    const callBackFunction = props.parentCallBack;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const addLocations = () => {
        console.log(locationSearchFrom, locationSearchTo);
        const callBackObject = {
            title: title,
            startEnd: {
                startLat: locationSearchFrom.lat,
                startLon: locationSearchFrom.lng,
                endLat: locationSearchTo.lat,
                endLon: locationSearchTo.lng,
            },
        }
        console.log(callBackObject);
        callBackFunction(callBackObject);

        handleClose();
    }

    return (
        <div>
            <Fab className={classes.fab} color="primary" aria-label="add" onClick={handleClickOpen}>
                <AddIcon />
            </Fab>
            <Dialog
                fullWidth={true}
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Location Search</DialogTitle>
                <DialogContent style={{ height: "50vh" }}>
                    <GeoapifyContext apiKey={apiKey}>
                        <GeoapifyGeocoderAutocomplete style={{ fontSize: '16px' }} placeholder="Enter from"
                            value={value}
                            lang={language}
                            countryCodes={countryCodes}
                            filterByCountryCode={filterByCountryCode}
                            placeSelect={onPlaceSelectFrom}
                            suggestionsChange={onSuggectionChangeFrom}
                        />
                    </GeoapifyContext>
                    <GeoapifyContext apiKey={apiKey}>
                        <GeoapifyGeocoderAutocomplete style={{ fontSize: '16px' }} placeholder="Enter to"
                            value={value}
                            lang={language}
                            countryCodes={countryCodes}
                            filterByCountryCode={filterByCountryCode}
                            placeSelect={onPlaceSelectTo}
                            suggestionsChange={onSuggectionChangeTo}
                        />
                    </GeoapifyContext>
                </DialogContent>
                <DialogContent>
                    <TextField onChange={(event) => setTitle(event.target.value)} variant="outlined" fullWidth label="Title of Path" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={addLocations} color="primary">Add Path</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}