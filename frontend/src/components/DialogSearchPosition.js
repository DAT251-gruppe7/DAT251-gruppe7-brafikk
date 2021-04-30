import React, { useState } from 'react';
import { Button, Fab } from '@material-ui/core';
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
        position: 'absolute',
        bottom: theme.spacing(10),
        right: theme.spacing(4),
    },
}));



export default function DialogSearchPosition(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [locationSearch, setLocationSearch] = useState("");
    const scroll = 'paper';
    const apiKey = process.env.REACT_APP_GEOAPIFY_API_KEY;

    const language = "no";
    const countryCodes = undefined;
    const value = "";
    const filterByCountryCode = ['no'];

    const onPlaceSelect = (value) => {
        console.log("onPlaceSelect: ", value);
        let newPosition = {};
        newPosition[value.properties.address_line1] = {
            "lat": value.properties.lat,
            "lng": value.properties.lon,
        };
        callBackFunction(newPosition);
        console.log("New position: ", newPosition)

        handleClose();
    }

    const onSuggectionChange = (value) => {
        console.log("onSuggestionChange: ", value);
        if (value.length > 0) {
            setLocationSearch(value[0].properties.name);
            console.log("Current locationSearch: ", locationSearch);
        }
    };



    const callBackFunction = props.parentCallBack;

    const handleClickOpen = () => {
        setOpen(true);
        //console.log(latLon)
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSearch = () => {
        console.log("INSIDE HANDLESEARCH")
        console.log(locationSearch)
        const params = {
            name: locationSearch,
            country: "Norway",
            apiKey: apiKey,
        }
        axios.get("https://api.geoapify.com/v1/geocode/search", { params })
            .then(res => {
                console.log(locationSearch)
                console.log(res.data)
                let newPosition = {};
                newPosition[locationSearch] = {
                    "lat": res.data.features[0].properties.lat,
                    "lng": res.data.features[0].properties.lon,
                }
                console.log("New position: ", newPosition)
                callBackFunction(newPosition)
            })
            .catch(err => {
                console.error(err)
            })

        handleClose()
    };

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
            //classes={{ paper: classes.dialogPaper }}
            >
                <DialogTitle id="form-dialog-title">Location Search</DialogTitle>
                <DialogContent style={{ height: "50vh" }}>

                    <GeoapifyContext apiKey={apiKey}>
                        <GeoapifyGeocoderAutocomplete style={{ fontSize: '16px' }} placeholder="Enter address here"
                            value={value}
                            lang={language}
                            countryCodes={countryCodes}
                            filterByCountryCode={filterByCountryCode}
                            placeSelect={onPlaceSelect}
                            suggestionsChange={onSuggectionChange}
                        />
                    </GeoapifyContext>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleSearch} color="primary">Search</Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}