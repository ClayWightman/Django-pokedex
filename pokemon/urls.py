from django.urls import path
from .views import PokemonListView, PokemonDetailView

urlpatterns = [
    path('', PokemonListView.as_view(), name = 'pokemon_home'),
    path('pokemon/<int:pk>/', PokemonDetailView.as_view(), name = 'pokemon_detail'),
]