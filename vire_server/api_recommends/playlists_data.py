from django.db import models


class PlaylistsData(models.Model):
    playlist_id = models.IntegerField()
    name = models.TextField()
    owner_id = models.IntegerField()
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
