from django.contrib import admin
from .models import Message

class MessageAdmin(admin.ModelAdmin):
    list_display = ('sender_email', 'recipient_email', 'title', 'body')

# Register your models here.
admin.site.register(Message, MessageAdmin)
