from django.shortcuts import render
from rest_framework import generics
from .serializers import MessageSerializer
from .models import Message

# Create your views here.

class MessageListCreate(generics.ListCreateAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

class MessageInboxCreate(generics.ListAPIView):
    serializer_class = MessageSerializer
    
    def get_queryset(self):
        """
        This view should return a list of all the purchases
        for the currently authenticated user.
        """
        user = self.request.user
        return Message.objects.filter(sender_email=user)