import time

from django.shortcuts import render

import os
import json
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
    TODO: check that params are valid numbers, and return something smart if they are not
    """

    def get(self, request, *args, **kwargs):
        start = time.process_time()
        latitude = request.query_params.get('latitude')
        longitude = request.query_params.get('longitude')

        sit_json = data_handler.get_poi_by_coordinate(latitude, longitude)
        print(f'single poi request: {(time.process_time() - start) * 1000}ms')
        return JsonResponse(sit_json, status=status.HTTP_200_OK)


class PathView(APIView):

    def get(self, request, *args, **kwargs):
        start = time.process_time()

        start_latitude = request.query_params.get('start_latitude')
        start_longitude = request.query_params.get('start_longitude')
        end_latitude = request.query_params.get('end_latitude')
        end_longitude = request.query_params.get('end_longitude')

        sit_lst_json = data_handler.get_path_by_coordinates(start_latitude, start_longitude, end_latitude,
                                                            end_longitude)

        print(f'path request: {(time.process_time() - start) * 1000}ms')

        temp_res = {'status': 'meh'}
        return JsonResponse(sit_lst_json, status=status.HTTP_200_OK)
