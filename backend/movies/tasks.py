import os
from ffmpy import FFmpeg
from celery import shared_task
from django.conf import settings

from .models import Movie


@shared_task
def generate_thumbnail(movie_id):
    try:
        movie = Movie.objects.get(id=movie_id)
        input_path = movie.video_file.path
        filename_wo_ext = os.path.splitext(os.path.basename(input_path))[0]
        output_dir = os.path.join(settings.MEDIA_ROOT, 'thumbnails')
        os.makedirs(output_dir, exist_ok=True)

        output_path = os.path.join(output_dir, f"{filename_wo_ext}_thumb.png")

        ff = FFmpeg(
            inputs={input_path: None},
            outputs={output_path: ['-ss', '00:00:04', '-vframes', '1']}
        )
        ff.run()

        movie.thumbnail.name = os.path.join('thumbnails', f"{filename_wo_ext}_thumb.png")
        movie.save()
        return f"Thumbnail generated at {movie.thumbnail.url}"
    except Exception as e:
        return str(e)
