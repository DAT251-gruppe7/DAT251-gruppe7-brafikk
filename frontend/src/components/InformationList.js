import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from '@material-ui/core/Typography';
import FilterHdrIcon from '@material-ui/icons/FilterHdr';
import TollIcon from '@material-ui/icons/Toll';
import WarningIcon from '@material-ui/icons/Warning';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import '../App.css';


function InformationList() {

    const [informations, setInformations] = useState([])

    useEffect(() => {
        let newInformationList = [
            {
                id: 1,
                title: "Vikafjellet",
                status: "Åpen",
                description: "ingen beskrivelse",
                road: "rv 13",
                isMountain: true,
            },
            {
                id: 2,
                title: "Filefjell",
                status: "Stengt",
                description: "ingen beskrivelse",
                road: "ev 15",
                isMountain: true,
            },
            {
                id: 3,
                title: "Oslofjordtunnelen",
                status: "Åpen",
                description: "ingen beskrivelse",
                road: "ev134",
                isMountain: false
            }
        ]
        setInformations(newInformationList)
    });




    return (
        <div>
            <AppBar position="static">
                <div style={{ flexGrow: 1 }}>

                    {informations.map((info) => {
                        return (
                            <Toolbar className="Toolbar" key={info.id}>
                                {info.isMountain && <FilterHdrIcon />}
                                {!info.isMountain && <TollIcon />}
                                <Typography style={{ flexGrow: 1 }}>
                                    {info.title}
                                </Typography>
                                <Typography>
                                    {info.status}
                                </Typography>
                                {info.status === "Åpen" && <CheckCircleIcon />}
                                {info.status !== "Åpen" && <WarningIcon />}
                            </Toolbar>
                        )
                    })}
                </div>

            </AppBar>
        </div>
    )

}

export default InformationList;

