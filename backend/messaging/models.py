from django.db import models

class Message(models.Model):
    sender_email = models.CharField(max_length=40)
    recipient_email = models.CharField(max_length=40, default='')
    title = models.CharField(max_length=40)
    body = models.CharField(max_length=40)

    def _str_(self):
        return 'From: ' + self.recipient_email + 'Title: ' + self.title + 'Body: ' + self.body