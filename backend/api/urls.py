from django.conf.urls import include
from django.urls import path
from rest_framework import routers

from .views import CreateUserView, MyProfileView, TaskViewSet

router = routers.DefaultRouter()
router.register("tasks", TaskViewSet)

urlpatterns = [
    path("myself/", MyProfileView.as_view(), name="myself"),
    path("register/", CreateUserView.as_view(), name="register"),
    path("", include(router.urls)),
]
