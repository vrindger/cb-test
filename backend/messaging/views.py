from django.shortcuts import render
from rest_framework import generics
from .serializers import MessageSerializer
from .models import Message
from django.db.models import Q
from  sys import stderr
from rest_framework.authtoken.models import Token
from re import sub

class MessageListCreate(generics.ListCreateAPIView):
    

    # queryset = Message.objects.all()
    def get_queryset(self):
        """
        This  should return a list of all the messages
        for the currently authenticated user.
        """
        
        return Message.objects.all() #filter(Q(sender_email=user) | Q(receiver_email=user)).order_by('-id')
    
    serializer_class = MessageSerializer
