class Situation:
    def __init__(self, lon, lat, text):
        self.lon = lon
        self.lat = lat
        self.text = text

    def serialize(self):
        response_data = {'longitude': self.lon, 'latitude': self.lat, 'status': self.text}
        return response_data
