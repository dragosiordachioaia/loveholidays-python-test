from django.conf.urls import url, include
from rest_framework.urlpatterns import format_suffix_patterns
from .views import CreateView, DetailsView

# from rest_framework import routers
#
# router = routers.SimpleRouter()
# router.register(r'api/todos', UserViewSet)
# router.register(r'accounts', AccountViewSet)
# urlpatterns = router.urls

urlpatterns = {
    url(r'^todos/$', CreateView.as_view(), name="create"),
    url(r'^todos/(?P<pk>[0-9]+)/$',DetailsView.as_view(), name="details"),
}

urlpatterns = format_suffix_patterns(urlpatterns)
