from django.urls import path
from .views import HomePageView, ResumePageView, AboutMeView

urlpatterns = [
    path('', HomePageView.as_view(), name = 'home'),
    path('resume/', ResumePageView.as_view(), name = "resume"),
    path('about_me/', AboutMeView.as_view(), name = "about_me")
]