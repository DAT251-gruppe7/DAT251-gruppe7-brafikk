import configparser
import os

from backend.datex.situation import Situation
from backend.datex.datex_loader import DatexLoader
from collections import defaultdict
import requests
from rest_framework import status


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

    def __init__(self):
        # print('Created data_handler, should only happen once')
        self.poi_mock_list = create_mock_sits()
        self.datex_loader = DatexLoader()
        self.path_cache = {}

        self.GEOAPIFY_API_KEY = os.environ.get('GEOAPIFY_API_KEY')
        if self.GEOAPIFY_API_KEY == None:
            config = configparser.ConfigParser()
            if config.read('config.ini'):
                self.GEOAPIFY_API_KEY = config.get('GEOAPIFY', 'API_KEY')
        print(self.GEOAPIFY_API_KEY)

    def get_poi_by_coordinate(self, lat, lng):
        sit_lat, sit_lng, sit_obj = self.datex_loader.get_poi(lat, lng)
        return sit_obj.serialize_general_data()

    def get_path_by_coordinates(self, start_latitude, start_longitude, end_latitude, end_longitude):

        key = (start_latitude, start_longitude, end_latitude, end_longitude)
        if key in self.path_cache:
            coords = self.path_cache[key]
        else:
            response = requests.get(
                f'https://api.geoapify.com/v1/routing?waypoints={start_latitude},{start_longitude}|{end_latitude},{end_longitude}&mode=drive&apiKey={self.GEOAPIFY_API_KEY}')
            print(f'STATUS CODE: {response.status_code}')
            if response.status_code == status.HTTP_400_BAD_REQUEST:
                return {}
            json_data = response.json()

            coords = json_data['features'][0]['geometry']['coordinates'][0]
            self.path_cache[key] = coords

        sits = defaultdict()
        for lng, lat in coords:
            sit_lat, sit_lng, sit_obj = self.datex_loader.check_poi(lat, lng)
            if sit_obj is not None:
                sits[id(sit_obj)] = sit_obj.serialize_general_data()

        if len(sits) == 0:
            return {}
        else:
            return sits
