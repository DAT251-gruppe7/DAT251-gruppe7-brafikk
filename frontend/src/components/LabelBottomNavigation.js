import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import HomeIcon from '@material-ui/icons/Home';
import MapIcon from '@material-ui/icons/Map';
import TimelineIcon from '@material-ui/icons/Timeline';

const useStyles = makeStyles((theme) => ({
    stickToBottom: {
        color: "#011936",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        width: "100%",
        height: "60px",
        "& .MuiBottomNavigationAction-root": {
            minWidth: 'auto',
        },
    },
}));

export default function LabelBottomNavigation() {
    const classes = useStyles();
    const [value, setValue] = React.useState('recents');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <BottomNavigation className={classes.stickToBottom} value={value} onChange={handleChange}  >
            <BottomNavigationAction label="Hjem" value="home" icon={<HomeIcon />} component={Link} to="/" />
            <BottomNavigationAction label="Steder" value="points" icon={<LocationOnIcon />} component={Link} to="/pointsofinterest" />
            <BottomNavigationAction label="Ruter" value="routes" icon={<TimelineIcon />} component={Link} to="/routes" />
        </BottomNavigation>
    );
}
