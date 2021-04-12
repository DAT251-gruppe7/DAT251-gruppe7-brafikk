import React from 'react';
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



const useStyles = makeStyles((theme) => ({
    fab: {
        position: 'absolute',
        bottom: theme.spacing(10),
        right: theme.spacing(4),
    },
}));





export default function DialogSearchPosition(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [locationSearch, setLocationSearch] = React.useState("");
    // Do this one extra step
    //const positions = props.parentLatLon;
    //const [latLon, setLatLon] = React.useState({ positions });
    const apiKey = process.env.REACT_APP_GEOAPIFY_API_KEY;

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
                // TODO we take the first 
                //console.log(latLon)
                /*
                setLatLon({
                    ...latLon,
                    "hi": {
                        "lat": res.data.features[0].properties.lat,
                        "lng": res.data.features[0].properties.lon,
                    }
                }); */
                let test = {};
                test[locationSearch] = {
                    "lat": res.data.features[0].properties.lat,
                    "lng": res.data.features[0].properties.lon,
                }
                console.log(test)
                callBackFunction(test)
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
}