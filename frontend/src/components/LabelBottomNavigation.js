import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import HomeIcon from '@material-ui/icons/Home';
import MapIcon from '@material-ui/icons/Map';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom';

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
            <BottomNavigationAction label="Hjem" value="Hjem" icon={<HomeIcon />} component={Link} to="/" />
            <BottomNavigationAction label="Points-of-interest" value="points" icon={<LocationOnIcon />} component={Link} to="/pointsofinterest" />
            <BottomNavigationAction label="Kart" value="map" icon={<MapIcon />} component={Link} to="/maps" />
            <BottomNavigationAction label="Bruker" value="account" icon={<AccountCircleIcon />} component={Link} to="/account" />
        </BottomNavigation>
    );
}
