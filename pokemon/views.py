from django.shortcuts import render
from django.views.generic import ListView, DetailView
from .models import Pokemon

class PokemonListView(ListView):
    model = Pokemon
    template_name = 'home.html'

# Create your views here.
class PokemonDetailView(DetailView):
    model = Pokemon
    template_name = 'pokemon/pokemon_detail.html'