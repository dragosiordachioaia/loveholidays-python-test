from rest_framework import serializers
from .models import Todo

class TodoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Todo
        fields = ('id', 'name', 'checked', 'date_created', 'date_modified')
        read_only_fields = ('date_created', 'date_modified')
