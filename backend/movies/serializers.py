from rest_framework import serializers

from .models import Movie

class MovieSerializer(serializers.ModelSerializer):
    video_file = serializers.FileField(required=False, allow_null=True)

    class Meta:
        model = Movie
        fields = '__all__'