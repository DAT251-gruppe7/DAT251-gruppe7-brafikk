import xml.etree.ElementTree as ET
from datetime import datetime

from scipy.spatial import KDTree
from backend.situation import Situation
import json


class DatexLoader:
    root_folder = 'DatexSampleData_20171023'
    document_name = 'GetSituation.xml'

    def __init__(self):
        self.ns = '{' + 'http://datex2.eu/schema/2/2_0' + '}'
        self.path = f"{DatexLoader.root_folder}/{DatexLoader.document_name}"

        self.tree = ET.parse(self.path)
        self.root = self.tree.getroot()

        for idx, elem in enumerate(self.root.iter(self.ns + 'situation')):
            s = Situation(elem)
            e = self.get_attr(elem, 'overallSeverity', target='text')
            # situation record - groupOfLocations - LocationForDisplay
            print(e)
            print(idx, s)

        points = [(2, 2, "not this"), (1.1, 1.1, "this"), (0.9, 0.9, " and this"), (2, 2, "not this one"),
                  (1.1, 1.1, "this"), (0.9, 0.9, " and this"), (2, 2, "not this one"), (1.1, 1.1, "this"),
                  (0.9, 0.9, " and this"), (2, 2, "not this one"), (1.1, 1.1, "this"), (0.9, 0.9, " and this"),
                  (2, 2, "not this one"), (1.1, 1.1, "this"), (0.9, 0.9, " and this"), (2, 2, "not this one"),
                  (1.1, 1.1, "this"), (0.9, 0.9, " and this"), (2, 2, "not this one"), (1.1, 1.1, "this"),
                  (0.9, 0.9, " and this"), (2, 2, "not this one"), (1.1, 1.1, "this"), (0.9, 0.9, " and this"),
                  (2, 2, "not this one"), (1.1, 1.1, "this"), (0.9, 0.9, " and this")]
        xpoints = list(map(lambda elem: [elem[0], elem[1]], points))

        tree = KDTree(xpoints)
        ind = tree.query_ball_point((2.5, 2.5), 3)

        for results in tree.query_ball_point([(1, 1)], 0.2):
            print(results)
            for res in results:
                print(points[res])

    def get_poi(self, lat, lng):
        pass

    def get_attr(self, tree, attr_name, target=None):
        elem = tree.find(self.ns + attr_name)
        if target == 'text' and elem is not None:
            elem = elem.text
        if target == 'date' and elem is not None:
            elem = datetime.strptime(elem.text, '%Y-%m-%dT%H:%M:%S%z')
        if target == 'float' and elem is not None:
            elem = float(elem)
        if target == 'int' and elem is not None:
            elem = int(elem)
        return elem


def main():
    sample_loader = DatexLoader()


if __name__ == '__main__':
    main()
