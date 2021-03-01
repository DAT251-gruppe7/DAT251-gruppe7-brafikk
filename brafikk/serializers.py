from rest_framework import serializers # This is important
from .models import Brafikk

class BrafikkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brafikk
        fields = ('title', 'status')