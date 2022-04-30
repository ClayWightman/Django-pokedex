from django.urls import path
from .views import HomePageView, AboutMeView, SiteInfoView, ResumeView
urlpatterns = [
    path('', HomePageView.as_view(), name = 'home'),
    path('about_me/', AboutMeView.as_view(), name = "about_me"),
    path('site_info/', SiteInfoView.as_view(), name = "site_info"),
    path('resume/', ResumeView.as_view(), name = "resume"),
    path('download_resume/<str:filename>/', ResumeView.download_resume, name = "resume_download"),
]