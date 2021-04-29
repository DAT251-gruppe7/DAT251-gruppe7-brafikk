from django.test import TestCase
from rest_framework import status


class PathRequestTest(TestCase):
    path = '/api/path/'

    def test_request_path_valid_coordinates(self):
        parameters = {'start_latitude': 60, 'start_longitude': 5, 'end_latitude': 61, 'end_longitude': 5}
        response = self.client.get(self.path, parameters)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_request_path_same_valid_coordinates(self):
        parameters = {'start_latitude': 60, 'start_longitude': 5, 'end_latitude': 6, 'end_longitude': 5}
        response = self.client.get(self.path, parameters)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_request_path_in_ocean_should_be_empty(self):
        parameters = {'start_latitude': 58.234591, 'start_longitude': -19.141971, 'end_latitude': 58.249085,
                      'end_longitude': -19.137271}
        response = self.client.get(self.path, parameters)
        self.assertEqual(response.json(), {})

    def test_request_path_lack_of_coordinates(self):
        parameters = {'something_else': 60, 'start_longitude': 5, 'end_latitude': 6, 'end_longitude': 5}
        response = self.client.get(self.path, parameters)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
