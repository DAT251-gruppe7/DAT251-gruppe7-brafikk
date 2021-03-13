from .situation import Situation
import random


def create_mock_sits():
    sit_list = []
    data_1 = {
        "situation-type": "veiarbeid",
        "situation-timestamp": "03:41...",
        "title": "Fløyfjelltunnelen",
        "lat": 66.1426,
        "lng": 50.8948,
        "color": "#ff00ff",
        "road": "E39",
        "info": "Veiarbeid ved nordre åpning",
        "starttime": "20:00..",
        "endtime": "23:00..",
    }
    sit_1 = Situation(data_1)
    sit_list.append(sit_1)

    data_2 = {
        "situation-type": "ulykke",
        "situation-timestamp": "22:00...",
        "title": "Fløyfjelltunnelen",
        "lat": 60.33855,
        "lng": 5.26403,
        "color": "#ff00ff",
        "road": "Fylkesvei 557",
        "info": "Stengt i retning sentrum",
        "starttime": "",
        "endtime": "",
    }
    sit_2 = Situation(data_2)
    sit_list.append(sit_2)

    return sit_list


class DataHandler:

    def __new__(self):
        if not hasattr(self, 'instance'):
            self.instance = super().__new__(self)
        return self.instance

    def __init__(self):
        self.poi_mock_list = create_mock_sits()

    def get_poi_by_coordinate(self, lon, lat):
        return random.choice(self.poi_mock_list)
