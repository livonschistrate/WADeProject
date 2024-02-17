from django.db import models


class SongsData(models.Model):
    song_id = models.IntegerField()
    name = models.TextField()
    singer = models.TextField()
    genre = models.TextField()
    album = models.TextField()
    release_date = models.DateTimeField()
