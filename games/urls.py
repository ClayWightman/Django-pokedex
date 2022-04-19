from django.urls import path
from .views import TetrisView

urlpatterns = [
    path('tetris/', TetrisView.as_view(), name = 'tetris'),
]