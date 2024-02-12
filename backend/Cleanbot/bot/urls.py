from django.urls import path, include
from .views import predict_start

urlpatterns = [
    path("predict", predict_start),
]
