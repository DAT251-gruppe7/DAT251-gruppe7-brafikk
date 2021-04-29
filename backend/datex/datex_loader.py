import xml.etree.ElementTree as ET
import os

import configparser

from datetime import datetime

from scipy.spatial import KDTree
from backend.datex.situation import Situation

import requests
from requests.auth import HTTPBasicAuth


class DatexLoader():
    ns = '{' + 'http://datex2.eu/schema/2/2_0' + '}'
    use_mock = False

    def __init__(self):

        # try to fetch secrets from environment variable, else use local config file
        self.DATEX_USERNAME = os.environ.get('DATEX_USERNAME')
        self.DATEX_PASSWORD = os.environ.get('DATEX_PASSWORD')
        if self.DATEX_USERNAME == None:
            config = configparser.ConfigParser()
            if config.read('config.ini'):
                self.DATEX_USERNAME = config.get('DATEX', 'USERNAME')
                self.DATEX_PASSWORD = config.get('DATEX', 'PASSWORD')

        self.datex_header = {'If-Modified-Since': 'Tue, 22 Apr 1980 10:10:10 GMT'}
        timestamp = datetime.utcnow()
        self.last_changed = timestamp

        path = self.load_xml(self.use_mock)
        if path is None:
            path = self.load_xml(mock=True)  # use mock data

        self.points = []
        self.KDtree = KDTree(self.parse_xml(path))

    def load_xml(self, mock):
        if mock:
            root_folder = 'backend/datex/DatexSampleData_20171023'
            document_name = 'GetSituation.xml'
            path = f"{root_folder}/{document_name}"
            return path
        else:
            url = 'https://www.vegvesen.no/ws/no/vegvesen/veg/trafikkpublikasjon/trafikk/2/GetSituation'
            root_folder = 'backend/datex/'
            auth = HTTPBasicAuth(self.DATEX_USERNAME, self.DATEX_PASSWORD)
            # header = {'If-Modified-Since': 'Tue, 22 Apr 2021 10:10:10 GMT'}
            response = requests.get(url, auth=auth, headers=self.datex_header)
            print('datex query')
            if response.status_code == 200:
                print('file update')
                timestamp = datetime.utcnow()
                self.last_changed = timestamp
                timestamp = timestamp.strftime('%a, %d %b %Y %H:%M:%S GMT')
                self.datex_header['If-Modified-Since'] = timestamp

                with open(root_folder + 'GetSituation.xml', 'w') as f:
                    f.write(response.content.decode("utf-8"))
                    # print(response.content)
                return f'{root_folder}GetSituation.xml'
        return None

    def parse_xml(self, path):
        self.tree = ET.parse(path)
        self.root = self.tree.getroot()

        for idx, elem in enumerate(self.root.iter(self.ns + 'situation')):
            s = Situation(elem)
            situationRecord = self.get_attr(elem, 'situationRecord')
            groupOfLocations = self.get_attr(situationRecord, 'groupOfLocations')
            group_type = groupOfLocations.attrib['{http://www.w3.org/2001/XMLSchema-instance}type']

            locationForDisplay = self.get_attr(groupOfLocations, 'locationForDisplay')
            latitude = self.get_attr(locationForDisplay, 'latitude', target='float')
            longitude = self.get_attr(locationForDisplay, 'longitude', target='float')
            self.points.append((latitude, longitude, s))

            if group_type == "Linear":
                linearExtension = self.get_attr(groupOfLocations, 'linearExtension')
                linearLineStringExtension = self.get_attr(linearExtension, 'linearLineStringExtension')
                gmlLineString = self.get_attr(linearLineStringExtension, 'gmlLineString')
                for elem in gmlLineString[0].text.strip().split(sep=", "):
                    tup = tuple(elem.split())
                    self.points.append((tup[1], tup[0], s))

            locationForDisplay = self.get_attr(groupOfLocations, 'locationForDisplay')
            latitude = self.get_attr(locationForDisplay, 'latitude', target='float')
            longitude = self.get_attr(locationForDisplay, 'longitude', target='float')
            self.points.append((latitude, longitude, s))
        print(f'len points = {len(self.points)}')
        xpoints = list(map(lambda elem: [elem[0], elem[1]], self.points))
        return xpoints

    def update_data(self, timestamp):
        minutes_diff = (timestamp - self.last_changed).total_seconds() / 60.0
        if minutes_diff > 15:
            print(f'MINUTES SINCE LAST DATEX QUERY: {minutes_diff}')

            path = self.load_xml(mock=False)
            if path is not None:
                self.points = []
                self.KDtree = KDTree(self.parse_xml(path))

    def get_poi(self, lat, lng):
        timestamp = datetime.utcnow()
        self.update_data(timestamp)
        poi_list = self.KDtree.query_ball_point([(lat, lng)], 0.001)
        if len(poi_list[0]) > 0:
            return self.points[poi_list[0][0]]  # TODO: revisit
        else:
            return lat, lng, Situation()

    def check_poi(self, lat, lng):
        timestamp = datetime.utcnow()
        self.update_data(timestamp)
        poi_list = self.KDtree.query_ball_point([(lat, lng)], 0.001)
        if len(poi_list[0]) > 0:
            return self.points[poi_list[0][0]]  # TODO: revisit
        else:
            return lat, lng, None

    def get_attr(self, tree, attr_name, target=None):
        elem = tree.find(DatexLoader.ns + attr_name)
        if target == 'text' and elem is not None:
            elem = elem.text
        if target == 'date' and elem is not None:
            elem = datetime.strptime(elem.text, '%Y-%m-%dT%H:%M:%S%z')
        if target == 'float' and elem is not None:
            elem = float(elem.text)
        if target == 'int' and elem is not None:
            elem = int(elem)
        return elem
