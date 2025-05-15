from django.urls import path, include

from rest_framework.routers import DefaultRouter
from .views import MovieViewSet


# GET /movies/: list all movies
# GET /movies/<id>/: get details of a specific movie
# POST /movies/: create a movie with video upload
# PUT /movies/<id>/: update a movie (support file replacement)
# DELETE /movies/<id>/: delete a movie
router = DefaultRouter()
router.register(r'movies', MovieViewSet, basename='movie')

urlpatterns = [
    path('', include(router.urls)),
]