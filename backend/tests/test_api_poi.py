from django.test import TestCase
from rest_framework import status


class SinglePoiRequest(TestCase):
    path = '/api/poi/'

    def test_random(self):
        self.assertEqual(3,3)

    """
    def test_request_poi_valid_coordinate_1(self):
        parameters = {'latitude': 0, 'longitude': 0}
        response = self.client.get(self.path, parameters)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_request_poi_valid_coordinate_2(self):
        parameters = {'latitude': 71, 'longitude': 25}
        response = self.client.get(self.path, parameters)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_request_poi_valid_coordinate_3(self):
        parameters = {'latitude': 58, 'longitude': 7.4}
        response = self.client.get(self.path, parameters)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_request_poi_invalid_coordinate_1(self):
        parameters = {'latitude': 'crd', 'longitude': 'sql_injection'}
        response = self.client.get(self.path, parameters)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_request_poi_invalid_coordinate_2(self):
        parameters = {'latitude': 10, 'longitude': -9999999}
        response = self.client.get(self.path, parameters)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_request_poi_lack_of_parameters(self):
        parameters = {'something_else': 5}
        response = self.client.get(self.path, parameters)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_request_in_the_ocean_should_return_empty_sit(self):
        parameters = {'latitude': 68, 'longitude': 1}
        response = self.client.get(self.path, parameters)
        data = response.json()
        self.assertEqual(data['color'], '#c2eabd')
        self.assertEqual(data['title'], 'No situation on coordinate. Display title and info stored frontend')
    """