import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import HomeIcon from '@material-ui/icons/Home';
import MapIcon from '@material-ui/icons/Map';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles({
    stickToBottom: {
        width: '100%',
        position: 'fixed',
        bottom: 0,
    },
});

export default function LabelBottomNavigation() {
    const classes = useStyles();
    const [value, setValue] = React.useState('recents');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <BottomNavigation value={value} onChange={handleChange} className={classes.stickToBottom}>
            <BottomNavigationAction label="Hjem" value="Hjem" icon={<HomeIcon />} />
            <BottomNavigationAction label="Points-of-interest" value="pints" icon={<LocationOnIcon />} />
            <BottomNavigationAction label="Kart" value="map" icon={<MapIcon />} />
            <BottomNavigationAction label="Bruker" value="account" icon={<AccountCircleIcon />} />
        </BottomNavigation>
    );
}
