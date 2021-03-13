from django.shortcuts import render

import os
import logging
from django.http import HttpResponse
from django.views.generic import View
from django.conf import settings

from rest_framework.views import APIView
from rest_framework import status
from django.http import JsonResponse

from .data_handler import DataHandler


class PoiView(APIView):
    def get(self, request, *args, **kwargs):
        data_handler = DataHandler()

        longitude = request.query_params.get('longitude')
        latitude = request.query_params.get('latitude')

        sit = data_handler.get_poi_by_coordinate(longitude, latitude)

        return JsonResponse(sit.serialize(), status=status.HTTP_200_OK)
