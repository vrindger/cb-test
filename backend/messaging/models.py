from django.db import models

class Message(models.Model):
    recipient = models.CharField(max_length=120)
    title = models.CharField(max_length=120)
    body = models.CharField(max_length=400)

    def _str_(self):
        return 'From: ' + self.recipient + 'Title: ' + self.title + 'Body: ' + self.body