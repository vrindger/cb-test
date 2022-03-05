from django import forms
from django.contrib.auth.forms import UserChangeForm, UserCreationForm 
from .models import CustomUser 

class CustomUserCreationForm(UserCreationForm):
    ''' Custom creation form for any extra fields necessary''' 
    class Meta:        
        model = CustomUser        
        fields = ('email', )

class CustomUserChangeForm(UserChangeForm):  
    ''' Custom user modification form '''  
    class Meta:        
        model = CustomUser        
        fields = UserChangeForm.Meta.fields