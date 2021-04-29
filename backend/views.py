import os
import logging

from django.http import HttpResponse
from django.views.generic import View
from django.conf import settings
from rest_framework.views import APIView
from rest_framework import status
from django.http import JsonResponse

from .data_handler import DataHandler

data_handler = DataHandler()


class FrontendAppView(View):
    """
    Serves the compiled frontend entry point (only works if you have run `yarn
    build`).
    """
    index_file_path = os.path.join(settings.REACT_APP_DIR, 'build', 'index.html')

    def get(self, request):
        try:
            with open(self.index_file_path) as f:
                return HttpResponse(f.read())
        except FileNotFoundError:
            logging.exception('Production build of app not found')
            return HttpResponse(
                """
                This URL is only used when you have built the production
                version of the app. Visit http://localhost:3000/ instead after
                running `yarn start` on the frontend/ directory
                """,
                status=501,
            )


class PoiView(APIView):
    """
    @param latitude:
    @param longitude:

    Returns a serialized situation object on given latitude and longitude.
    Empty serialized object with color green is returned if there is no stored situation
    on given latitude and longitude
    """

    def get(self, request, *args, **kwargs):
        latitude = request.query_params.get('latitude')
        longitude = request.query_params.get('longitude')

        if validate_coordinate(latitude, longitude):
            sit_json = data_handler.get_poi_by_coordinate(latitude, longitude)
            return JsonResponse(sit_json, status=status.HTTP_200_OK)
        else:
            return JsonResponse({'error': 'invalid coordinate'}, status=status.HTTP_400_BAD_REQUEST)


class PathView(APIView):
    """
    @param start_latitude:
    @param start_longitude:
    @param end_latitude:
    @param end_longitude:

    Returns a list of serialized situation objects on given pair of latitude and longitude.
    """

    def get(self, request, *args, **kwargs):

        start_latitude = request.query_params.get('start_latitude')
        start_longitude = request.query_params.get('start_longitude')
        end_latitude = request.query_params.get('end_latitude')
        end_longitude = request.query_params.get('end_longitude')

        if validate_coordinate(start_latitude, start_longitude) and validate_coordinate(end_latitude, end_longitude):
            sit_lst_json = data_handler.get_path_by_coordinates(start_latitude, start_longitude, end_latitude,
                                                                end_longitude)
            return JsonResponse(sit_lst_json, status=status.HTTP_200_OK)
        else:
            return JsonResponse({'error': 'invalid coordinate(s)'}, status=status.HTTP_400_BAD_REQUEST)


def validate_coordinate(lat, lng):
    if not lat or not lng:
        return False

    if not isfloat(lat) or not isfloat(lng):
        return False

    lat = float(lat)
    lng = float(lng)

    if lat < -90 or lat > 90:
        return False
    if lng < -180 or lng > 180:
        return False

    return True


def isfloat(value):
    try:
        float(value)
        return True
    except ValueError:
        return False
