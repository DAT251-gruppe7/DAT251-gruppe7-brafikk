import { Card, CardMedia } from '@material-ui/core';
import mapPicture from '../assets_frontend/maps.png';

export default function MapsPicture() {
    return (
        <Card>
            <CardMedia
                image={mapPicture}
                title="Brafikk Logo"
            />
        </Card>
    )
}