from django.db import models

# Create your models here.


class Users(models.Model):
    user_id = models.AutoField(primary_key=True)
    username = models.TextField()
    email = models.TextField()
    password = models.TextField()
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    discogs_linked = models.BooleanField()
    lastfm_linked = models.BooleanField()
    logged_in = models.BooleanField()

    class Meta:
        managed = False
        db_table = 'users'


class PlaylistsUsers(models.Model):
    up_id = models.AutoField(primary_key=True)
    playlist_id = models.ForeignKey('Playlists', models.DO_NOTHING, db_column='playlist_id')
    user_id = models.ForeignKey('Users', models.DO_NOTHING, db_column='user_id')

    class Meta:
        managed = False
        db_table = 'playlist_users'


class Playlists(models.Model):
    playlist_id = models.AutoField(primary_key=True)
    name = models.TextField()
    owner_id = models.IntegerField()
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'playlist'


class PlaylistsSongs(models.Model):
    ps_id = models.AutoField(primary_key=True)
    playlist_id = models.ForeignKey('Playlists', models.DO_NOTHING, db_column='playlist_id')
    song_id = models.ForeignKey('Songs', models.DO_NOTHING, db_column='songs_id')

    class Meta:
        managed = False
        db_table = 'playlists_songs'


class Songs(models.Model):
    song_id = models.AutoField(primary_key=True)
    name = models.TextField()
    singer = models.TextField()
    genre = models.TextField()
    album = models.TextField()
    release_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'songs'