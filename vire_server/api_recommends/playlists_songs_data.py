from django.db import models


class PlaylistsSongsData(models.Model):
    id = models.IntegerField()
    playlist_id = models.ForeignKey('Playlists', models.DO_NOTHING, db_column='playlist_id')
    song_id = models.ForeignKey('Songs', models.DO_NOTHING, db_column='songs_id')
