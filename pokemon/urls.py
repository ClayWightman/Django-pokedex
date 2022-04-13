from django.urls import path
from .views import PokemonListView

urlpatterns = [
    path('', PokemonListView.as_view(), name = 'home')
]