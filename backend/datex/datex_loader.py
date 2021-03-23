import xml.etree.ElementTree as ET
from datetime import datetime

from scipy.spatial import KDTree
from backend.datex.situation import Situation


class DatexLoader:
    root_folder = 'backend/datex/DatexSampleData_20171023'
    #root_folder = 'backend/datex/DatexSampleData_20210323'
    document_name = 'GetSituation.xml'
    ns = '{' + 'http://datex2.eu/schema/2/2_0' + '}'
    path = f"{root_folder}/{document_name}"

    def __init__(self):

        #print(f'path {DatexLoader.path}')
        self.tree = ET.parse(self.path)
        self.root = self.tree.getroot()

        self.points = []
        for idx, elem in enumerate(self.root.iter(self.ns + 'situation')):
            s = Situation(elem)
            situationRecord = self.get_attr(elem, 'situationRecord')
            groupOfLocations = self.get_attr(situationRecord, 'groupOfLocations')
            locationForDisplay = self.get_attr(groupOfLocations, 'locationForDisplay')
            latitude = self.get_attr(locationForDisplay, 'latitude', target='float')
            longitude = self.get_attr(locationForDisplay, 'longitude', target='float')
            self.points.append((latitude, longitude, s))
            # situation record - groupOfLocations - LocationForDisplay
            # print(latitude, longitude)
            # print(idx, s)

        xpoints = list(map(lambda elem: [elem[0], elem[1]], self.points))

        self.KDtree = KDTree(xpoints)

    def get_poi(self, lat, lng):
        # TODO: check xml flag and rebuild KDTree if necessary
        #print(f'DATEX LOADER ID: {id(self)}')
        """
        kdtree = KDTree(xpoints)
        start = time.process_time()
        for results in kdtree.query_ball_point([(60.56486, 5.334039)], 0.0001):
            print(f"{(time.process_time() - start) * 1000}ms")
            print(results)
            for res in results:
                print(loc_to_sit[res][2].info['comment'])
        """
        poi_list = self.KDtree.query_ball_point([(lat, lng)], 0.0001)
        # print(poi_list)
        if len(poi_list[0]) > 0:
            return self.points[poi_list[0][0]]  # TODO: revisit
        else:
            return lat, lng, Situation()

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


def main():
    sample_loader = DatexLoader()
    lat, lng, data = sample_loader.get_poi(60.56486, 5.334039)
    # print(data)
    print(data.serialize_general_data())


if __name__ == '__main__':
    main()
