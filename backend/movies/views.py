from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from rest_framework import viewsets
from rest_framework.exceptions import MethodNotAllowed

from .models import Movie
from .serializers import MovieSerializer 
from .tasks import generate_thumbnail


class MovieViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing movie instances.
    """
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer 

    @swagger_auto_schema(
        operation_description="Retrieve a list of all movies.",
        responses={200: MovieSerializer(many=True)},
        manual_parameters=[
            openapi.Parameter('Authorization', openapi.IN_HEADER, description="Bearer [JWT token]", type=openapi.TYPE_STRING),
        ]
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="Create a new movie instance.",
        responses={201: MovieSerializer},
    )
    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        movie_id = response.data['id']
        generate_thumbnail.delay(movie_id)
        return response
    
    @swagger_auto_schema(auto_schema=None)
    def partial_update(self, request, *args, **kwargs):
        raise MethodNotAllowed("PATCH")

    @swagger_auto_schema(
        operation_description="Retrieve a specific movie instance.",
        responses={200: MovieSerializer},
    )
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="Update a specific movie instance.",
        responses={200: MovieSerializer},
    )
    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="Delete a specific movie instance.",
        responses={204: 'No Content'},
    )
    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)
