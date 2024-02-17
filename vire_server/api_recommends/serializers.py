from rest_framework import serializers
from .models import *


class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ('user_id', 'username', 'email', 'country_code', 'created_at', 'updated_at')


class PlaylistsUsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlaylistsUsers
        fields = ('id', 'playlist_id', 'user_id')


class PlaylistsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Playlists
        fields = ('playlist_id', 'name', 'owner_id', 'created_at', 'updated_at')


class PlaylistsSongsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlaylistsSongs
        fields = ('id', 'playlist_id', 'song_id')


class SongsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Songs
        fields = ('song_id', 'name', 'singer', 'genre', 'album', 'release_date')
