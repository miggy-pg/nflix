# Generated by Django 5.2.1 on 2025-05-15 03:41

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Movie',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(db_index=True, max_length=100)),
                ('description', models.TextField(blank=True, null=True)),
                ('date_added', models.DateField(auto_now_add=True)),
                ('video_file', models.FileField(blank=True, null=True, upload_to='')),
            ],
        ),
    ]
