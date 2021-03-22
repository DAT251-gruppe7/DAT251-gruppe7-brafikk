import xml.etree.ElementTree as ET
from scipy.spatial import KDTree
from ..situation import Situation
import json


class DatexLoader:
    root_folder = 'DatexSampleData_20171023'
    document_name = 'GetSituation.xml'

    def __init__(self):
        ns = '{' + 'http://datex2.eu/schema/2/2_0' + '}'
        path = f"{DatexLoader.root_folder}/{DatexLoader.document_name}"

        tree = ET.parse(path)
        root = tree.getroot()

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
