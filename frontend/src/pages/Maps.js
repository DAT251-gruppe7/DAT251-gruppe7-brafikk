import { Card, CardMedia } from '@material-ui/core';
import mapPicture from '../assets_frontend/maps.png';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    media: {
        height: 140,
    },
});

export default function Maps() {

    const classes = useStyles();

    return (
        <div>

            <Card>
                <CardMedia
                    className={classes.media}
                    image={mapPicture}
                    title="Brafikk Logo"
                />

            </Card>
            <div>
                <p>
                    This is the maps page
                </p>
            </div>
        </div>


    )
}