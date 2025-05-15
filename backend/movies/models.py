from django.db import models

class Movie(models.Model):
    title = models.CharField(max_length=100, db_index=True)
    description = models.TextField(null=True, blank=True)
    date_added = models.DateField(auto_now_add=True)
    video_file = models.FileField(
        blank=True, null=True, default="avatar/default.jpg"
    )

    class Meta:
        verbose_name = "Movie"
        verbose_name_plural = "Movies"
    
    def __str__(self):
        return self.title
