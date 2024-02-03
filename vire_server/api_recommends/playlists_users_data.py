from django.db import models


class PlaylistsUsersData(models.Model):
    id = models.IntegerField()
    playlist_id = models.ForeignKey('Playlists', models.DO_NOTHING, db_column='playlist_id')
    user_id = models.ForeignKey('Users', models.DO_NOTHING, db_column='user_id')
