from backend.datex.situation import Situation
from backend.datex.datex_loader import DatexLoader
import random


def create_mock_sits():
    sit_list = [
        Situation({
            "situationType": "veiarbeid",
            "situationTimestamp": "03:41",
            "title": "Fløyfjelltunnelen",
            "lat": 66.1426,
            "lng": 50.8948,
            "color": "#f9dc5c",
            "road": "E39",
            "info": "Veiarbeid ved nordre åpning",
            "startTime": "20:00",
            "endTime": "23:00",
        }),
        Situation({
            "situationType": "ulykke",
            "situationTimestamp": "22:00...",
            "title": "Knappetunnelen",
            "lat": 60.33855,
            "lng": 5.26403,
            "color": "#ed254e",
            "road": "F557",
            "info": "Stengt i retning sentrum",
            "startTime": "",
            "endTime": "",
        }),
        Situation({
            "situationType": "",
            "situationTimestamp": "",
            "title": "Arnanipatunnelen",
            "lat": 0,
            "lng": 0,
            "color": "#c2eabd",
            "road": "E16",
            "info": "",
            "startTime": "",
            "endTime": "",
        }),
    ]

    return sit_list


class Singleton(type):
    _instances = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super(Singleton, cls).__call__(*args, **kwargs)
        return cls._instances[cls]


class DataHandler(metaclass=Singleton):

    # def __new__(self):
    #     if not hasattr(self, 'instance'):
    #         self.instance = super().__new__(self)
    #     return self.instance

    def __init__(self):
        #print('Created data_handler, should only happen once')
        self.poi_mock_list = create_mock_sits()
        self.datex_loader = DatexLoader()

    def get_poi_by_coordinate(self, lat, lng):
        sit_lat, sit_lng, sit_obj = self.datex_loader.get_poi(lat, lng)
        #print(f'Datex_loader: {id(self.datex_loader)}')
        #print(self.datex_loader)
        return sit_obj.serialize_general_data()
