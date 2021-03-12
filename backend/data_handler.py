from .situation import Situation


class DataHandler:
    def __new__(self):
        if not hasattr(self, 'instance'):
            self.instance = super().__new__(self)
        return self.instance

    def get_poi_by_coordinate(self, lon, lat):
        test_obj = Situation(lon, lat, 'OPEN')
        return test_obj
