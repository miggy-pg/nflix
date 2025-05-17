from django.db import models

class Movie(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)
    date_added = models.DateField(auto_now_add=True)
    video_file = models.FileField(
        upload_to="videos", 
        blank=True, 
        null=True, 
        max_length=255
    )
    thumbnail = models.ImageField(
        upload_to="thumbnails/", 
        null=True, 
        blank=True, 
        max_length=255
    )

    class Meta:
        verbose_name = "Movie"
        verbose_name_plural = "Movies"
    
    def __str__(self):
        return self.title
