from rest_framework import generics, viewsets
from rest_framework.permissions import AllowAny

from .models import Task
from .serializers import TaskSerializer, UserSerializer

# Create your views here.


class CreateUserView(generics.CreateAPIView):
    """
    アカウント新規作成の時に使用する
    """

    serializer_class = UserSerializer
    permission_classes = (AllowAny,)


class MyProfileView(generics.RetrieveUpdateAPIView):
    """
    ログインしているユーザーのプロフィールを取得する
    """

    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class TaskViewSet(viewsets.ModelViewSet):
    """
    TaskをCLUDする
    """

    queryset = Task.objects.all()
    serializer_class = TaskSerializer
