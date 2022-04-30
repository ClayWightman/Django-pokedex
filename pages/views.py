from django.shortcuts import render
from django.views.generic import TemplateView
import mimetypes
import os
from django.http.response import HttpResponse


class HomePageView(TemplateView):
    template_name = 'pages/home.html'


class AboutMeView(TemplateView):
    template_name = 'pages/about_me.html'

class SiteInfoView(TemplateView):
    template_name = 'pages/site_info.html'

class ResumeView(TemplateView):
    template_name = 'pages/resume.html'
    def download_resume(request, filename = ''):
        # Define Django project base directory
        BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        # Define the full file path
        filepath = BASE_DIR + '/static/files/' + filename
        # Open the file for reading content
        path = open(filepath, 'rb')
        # Set the mime type
        mime_type, _ = mimetypes.guess_type(filepath)
        # Set the return value of the HttpResponse
        response = HttpResponse(path, content_type=mime_type)
        # Set the HTTP header for sending to browser
        response['Content-Disposition'] = "attachment; filename=%s" % filename
        # Return the response value
        return response