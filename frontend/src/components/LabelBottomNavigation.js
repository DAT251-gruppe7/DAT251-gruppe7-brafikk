import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import HomeIcon from '@material-ui/icons/Home';
import MapIcon from '@material-ui/icons/Map';
import TimelineIcon from '@material-ui/icons/Timeline';
import SearchIcon from '@material-ui/icons/Search';
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
            <BottomNavigationAction label="Hjem" value="home" icon={<HomeIcon />} component={Link} to="/" />
            <BottomNavigationAction label="Søk" value="seach" icon={<SearchIcon />} component={Link} to="/search" />
            <BottomNavigationAction label="Points-of-interest" value="points" icon={<LocationOnIcon />} component={Link} to="/pointsofinterest" />
            <BottomNavigationAction label="Kart" value="map" icon={<MapIcon />} component={Link} to="/maps" />
            <BottomNavigationAction label="Ruter" value="routes" icon={<TimelineIcon />} component={Link} to="/routes" />
        </BottomNavigation>
    );
}
