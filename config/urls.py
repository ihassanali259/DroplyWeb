from django.contrib import admin
from django.urls import path

from core import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/info/", views.info),
    path("downloads/<str:platform>/", views.download),
    path("", views.index),
]
