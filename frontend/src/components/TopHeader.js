import React from 'react';
import { makeStyles, fade, darken } from '@material-ui/core/styles';
import brafikk_logo from '../assets_frontend/brafikk_logo.png';
import '../App.css';
import { AppBar, Toolbar, IconButton, InputBase } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    logo: {
        maxWidth: 90,
        marginRight:theme.spacing(0.5),
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: darken(theme.palette.common.white, 0.05),
        '&:hover': {
            backgroundColor: darken(theme.palette.common.white, 0.10),
        },
        marginRight: theme.spacing(0.5),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          width: '12ch',
          '&:focus': {
            width: '20ch',
          },
        },
      },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));

export default function TopHeader() {
    const classes = useStyles();

    return (
        <div className={classes.grow}>
            <AppBar variant="elevation" elevation={1} position="static" color="transparent">
                <Toolbar>
                    <img className={classes.logo} alt="brafikk" src={brafikk_logo} />
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    <div className={classes.grow} />
                    <div className={classes.sectionMobile}>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <SettingsIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}
