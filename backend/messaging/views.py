from django.shortcuts import render
from rest_framework import generics
from .serializers import MessageSerializer
from .models import Message

# Create your views here.

class MessageListCreate(generics.ListCreateAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
