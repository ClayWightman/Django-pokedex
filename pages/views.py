from django.shortcuts import render
from django.views.generic import TemplateView


class HomePageView(TemplateView):
    template_name = 'pages/home.html'

class ResumePageView(TemplateView):
    template_name = 'pages/resume.html'

class AboutMeView(TemplateView):
    template_name = 'pages/about_me.html'