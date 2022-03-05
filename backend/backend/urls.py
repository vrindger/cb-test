from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

# router = routers.DefaultRouter()
# router.register(r'messages', views.MessageView, 'message')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/users/', include('users.urls')),
    path('', include('messaging.urls')),
]
