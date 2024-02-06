from django.contrib import admin
from django.urls import path, include
# from bot.views import predictAPI

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('cleanbot/', include('bot.urls'))
]
