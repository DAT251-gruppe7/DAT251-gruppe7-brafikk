import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete';
import '@geoapify/geocoder-autocomplete/styles/minimal.css'



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
    const [scroll, setScroll] = useState('paper');
    // Do this one extra step
    //const positions = props.parentLatLon;
    //const [latLon, setLatLon] = React.useState({ positions });
    const apiKey = process.env.REACT_APP_GEOAPIFY_API_KEY;


    // Here comes a bunch of autocomplete stuff
    // Source: https://github.com/geoapify/react-geocoder-autocomplete/blob/master/example/src/App.js
    //const [type, setType] = useState();
    const [language, setLanguage] = useState("no");
    const [countryCodes, setCountryCodes] = useState();
    const [value, setValue] = useState("");
    const [filterByCountryCode, setFilterByCountryCode] = useState(['no']);

    /*
    function handleTypeChange(event) {
        setType(event.target.value);
    }
    */

    function handleValueChange(event) {
        setValue(event.target.value);
    }


    const onPlaceSelect = (value) => {
        console.log("onPlaceSelect: ", value);
        let newPosition = {};
        newPosition[value.properties.name] = {
            "lat": value.properties.lat,
            "lng": value.properties.lon,
        };
        callBackFunction(newPosition);
        console.log("New position: ", newPosition)

        //handleClose();
    }

    const onSuggectionChange = (value) => {
        console.log("onSuggestionChange: ", value);
        console.log("value length = ", value.length);
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

    const handleChange = (event) => {
        setLocationSearch(event.target.value);
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

    /*
    return (
        <div>
            <Fab className={classes.fab} color="primary" aria-label="add" onClick={handleClickOpen}>
                <AddIcon />
            </Fab>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Location Search</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Search for a location, to get the Latitude and Longitude
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="location"
                        label="Enter a location"
                        fullWidth
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={handleSearch} color="primary">
                        Search
          </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
    */

    return (
        <div>
            <Fab className={classes.fab} color="primary" aria-label="add" onClick={handleClickOpen}>
                <AddIcon />
            </Fab>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="form-dialog-title"
            //classes={{ paper: classes.dialogPaper }}
            >
                <DialogTitle id="form-dialog-title">Location Search</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Search for a location, to get the Latitude and Longitude
                    </DialogContentText>
                    <DialogContent style={{ height: '200px' }}>

                        <GeoapifyContext apiKey={apiKey}>
                            <GeoapifyGeocoderAutocomplete placeholder="Enter address here"
                                value={value}
                                //type={type}
                                lang={language}
                                countryCodes={countryCodes}
                                filterByCountryCode={filterByCountryCode}
                                //biasByCountryCode={biasByCountryCode}
                                placeSelect={onPlaceSelect}
                                suggestionsChange={onSuggectionChange}
                            //skipIcons={true}
                            //skipDetails={true}
                            />
                        </GeoapifyContext>
                    </DialogContent>


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={handleSearch} color="primary">
                        Search
          </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}