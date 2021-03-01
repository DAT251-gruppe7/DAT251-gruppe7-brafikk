from django.shortcuts import render
from django.http import JsonResponse
from django.views import View
from .serializers import BrafikkSerializer
from .models import Brafikk

# third party imports
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets


# Create your views here.

class TestView(APIView):
    def get(self, requst, *args, **kwargs):
        data = {
            'id': 'Knappetunnelen',
            'status': 'open'}
        return Response(data)

class BrafikkView(viewsets.ModelViewSet):
    serializer_class = BrafikkSerializer
    queryset = Brafikk.objects.all()


class Assets(View):

    def get(self, _request, filename):
        path = os.path.join(os.path.dirname(__file__), 'static', filename)

        if os.path.isfile(path):
            with open(path, 'rb') as file:
                return HttpResponse(file.read(), content_type='application/javascript')
        else:
            return HttpResponseNotFound()