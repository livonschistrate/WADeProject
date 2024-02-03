from django.db import models


class UsersData(models.Model):
    user_id = models.IntegerField()
    username = models.TextField()
    email = models.TextField()
    country_code = models.IntegerField()
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
