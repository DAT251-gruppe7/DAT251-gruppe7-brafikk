from django.shortcuts import render
from django.http import JsonResponse

# third party imports
from rest_framework.response import Response
from rest_framework.views import APIView


# Create your views here.

class TestView(APIView):
    def get(self, requst, *args, **kwargs):
        data = {
            'id': 'Knappetunnelen',
            'status': 'open'}
        return Response(data)


