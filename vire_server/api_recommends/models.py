from rdflib import Graph, Literal, BNode, Namespace, RDF, URIRef
from SPARQLWrapper import SPARQLWrapper, POST, JSON

from django.db import models

# Create your models here.

schema = Namespace("https://schema.org/MusicRecording")


class Users(models.Model):
    user_id = models.IntegerField()
    username = models.TextField()
    email = models.TextField()
    country_code = models.IntegerField()
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'users'


class PlaylistsUsers(models.Model):
    id = models.IntegerField()
    playlist_id = models.ForeignKey('Playlists', models.DO_NOTHING, db_column='playlist_id')
    user_id = models.ForeignKey('Users', models.DO_NOTHING, db_column='user_id')

    class Meta:
        managed = False
        db_table = 'playlist_users'


class Playlists(models.Model):
    playlist_id = models.IntegerField()
    name = models.TextField()
    owner_id = models.IntegerField()
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'playlist'


class PlaylistsSongs(models.Model):
    id = models.IntegerField()
    playlist_id = models.ForeignKey('Playlists', models.DO_NOTHING, db_column='playlist_id')
    song_id = models.ForeignKey('Songs', models.DO_NOTHING, db_column='songs_id')

    class Meta:
        managed = False
        db_table = 'playlists_songs'


class Songs(models.Model):
    song_id = models.IntegerField()
    name = models.TextField()
    singer = models.TextField()
    genre = models.TextField()
    album = models.TextField()
    release_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'songs'
