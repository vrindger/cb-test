from django.db import models

class Message(models.Model):
    sender_email = models.CharField(max_length=40)
    recipient_email = models.CharField(max_length=40, default='')
    title = models.CharField(max_length=40)
    message_body = models.CharField(max_length=100)

    def _str_(self):
        return 'To: ' + self.recipient_email + 'Title: ' + self.title + 'MessageBody: ' + self.message_body